import async from 'async';
import moment from 'moment';
import RequestBodyChecker from '../../utils/request.body.verifier';
import Response from '../../utils/response';
import config from '../../../config';
import applicationQuery from '../../queries/applications';
import storeQuery from '../../queries/store';
import db from '../../utils/database';
import { getRandomString } from '../../helpers/utils';

const Checker = new RequestBodyChecker();
const ResponseHandler = new Response(config.DOMAIN);

const checkRequest = (req, callback) => {
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Checking incoming request in edit.application.merchant.and.store.controller.js`);
  const error = Checker.checkRequestBody(req.body, ['application_id', 'merchant_id', 'store_id']);
  if (error) {
    logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: Incoming request validation error occurred in edit.application.merchant.and.store.controller.js`, error);
    return callback(error);
  }
  const { body, user } = req;
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Finished Checking incoming request in edit.application.merchant.and.store.controller.js`);
  return callback(null, body, user);
};

const verifyApplication = (body, user, callback) => {
  const { application_id } = body;
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Validating application with ID  [ ${application_id} ] in edit.application.merchant.and.store.controller.js`);
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Fetching application with ID [ ${application_id} ]  in edit.application.merchant.and.store.controller.js`);
  db.oneOrNone(applicationQuery.getApplicationById, [application_id])
    .then((application) => {
      if (!application) {
        logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: No application with ID [ ${application_id} ] found in DB in edit.application.merchant.and.store.controller.js`);
        return callback('No application was found with this id');
      } if (application.application_status !== 'Enter Merchandise Details') {
        logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: Attempting to change merchant and store for an application after invoicing. APP-ID :[ ${application_id} ] in DB in edit.application.merchant.and.store.controller.js`);
        return callback('Merchant and store could only be changed before invoicing');
      }
      logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Found application with ID [ ${application_id} ] in edit.application.merchant.and.store.controller.js`);
      return callback(null, body, user);
    })
    .catch((e) => {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: Database error from verifyApplication method with ID [ ${application_id} ] in edit.application.merchant.and.store.controller.js`, e);
      return callback('Unable to verify application');
    });
};

const verifyMerchantAndStore = (body, user, callback) => {
  const { store_id, merchant_id } = body;
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Validating merchant and store with ID [ ${merchant_id} ] [ ${store_id} ] in edit.application.merchant.and.store.controller.js`);
  db.oneOrNone(storeQuery.getStoreByMerchantAndStoreId, [store_id, merchant_id])
    .then((store) => {
      if (!store) {
        logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: Could not find merchant and store combination with ID [ ${merchant_id} ] [ ${store_id} ] in DB in edit.application.merchant.and.store.controller.js`);
        return callback('Could not find merchant and store combination');
      }

      logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Found merchant and store with ID [ ${merchant_id} ] [ ${store_id} ] in edit.application.merchant.and.store.controller.js`);
      return callback(null, body, user);
    })
    .catch((e) => {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: Database error from verifyMerchantAndStore method with ID [ ${merchant_id} ] [ ${store_id} ] in edit.application.merchant.and.store.controller.js`, e);
      return callback('Unable to verify merchant and store');
    });
};

const updateApplication = (body, user, callback) => {
  const { application_id, store_id, merchant_id } = body;
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Updating application with ID [ ${application_id} ] in edit.application.merchant.and.store.controller.js`);
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Attempting to update applications merchant and store to [ ${merchant_id} ] [ ${store_id} ] in edit.application.merchant.and.store.controller.js`);
  db.none(applicationQuery.updateApplicationMerchantAndStore, [store_id, merchant_id, application_id])
    .then(() => {
      logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Info: Finished updating application merchant and store with id [ ${application_id} ] in edit.application.merchant.and.store.controller.js`);
      return callback(null, body, user);
    })
    .catch((e) => {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}] Error: Error occured while updating application merchant and store with id [ ${application_id} ] in edit.application.merchant.and.store.controller.js`, e);
      return callback('Unable to update merchant and store for this application');
    });
};

const logActivityToTimeline = (body, user, callback) => {
  const { application_id, merchant_id, store_id } = body;
  logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, `Info: Logging application changes to timeline [ ${application_id} ] in edit.application.merchant.and.store.controller.js`);
  const dashboardUserId = user.id;
  const timelineType = '';
  const status = `New merchant [ ${merchant_id} ] and store [ ${store_id} ] updated for application [ ${application_id} ]`;
  const createdAt = moment();
  const updatedAt = moment();
  const id = getRandomString();
  const applicationId = application_id;

  db.none(applicationQuery.logToTimeline, [id, status, applicationId, timelineType, dashboardUserId, createdAt, updatedAt, '']).then(() => {
    logger.info(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, `Info: Application [ ${application_id} ]updated successfully in in edit.application.merchant.and.store.controller.js`);
    return callback(null, true);
  }).catch((e) => {
    logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, `Error: An error occurred while logging  activity to timeline for application [ ${application_id} ] from logActivityToTimeline method in edit.application.merchant.and.store.controller.js`, e);
    return callback('Unable to log activity to timeline');
  });
};

function editMerchantAndStoreForApplication(req, res) {
  async.waterfall(
    [
      async.apply(checkRequest, req),
      verifyApplication,
      verifyMerchantAndStore,
      updateApplication,
      logActivityToTimeline
    ],
    (error, response) => {
      if (error) {
        res.status(400).json(ResponseHandler.error(req.originalUrl, error, 'Bad Request'));
      } else {
        res.status(200).json(ResponseHandler.success(req.originalUrl, {
          message: 'Application Merchant and Store Updated Successfully',
          data: response
        }));
      }
    }
  );
}

export default editMerchantAndStoreForApplication;
