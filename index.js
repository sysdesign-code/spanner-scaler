// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');

// Instantiates a client
const spanner = new Spanner();

// TODO Your Cloud Spanner instance ID
const instanceId = 'test-instance';


/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.scaleSpanner = async (req, res) => {
  // Gets a reference to a Cloud Spanner instance and database
  const instance = spanner.instance(instanceId);

  // TODO set any metadata you wish to change on the existing spanner instance
  const metadata = {
    "nodeCount": 2
    //"processingUnits": integer,
  };
  
  instance.setMetadata(metadata, function(err, operation, apiResponse) {
    if (err) {
      console.error("error setting instance metadata:" +err);
    }
  
    operation
      .on('error', function(err) {})
      .on('complete', function() {
        console.log("instance scaled successfully");
      });
  });
}