/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var config = {
  detailedErrors: false
, hostname: null
, recaptcha: {
    publicKey: process.env.RECAPTCHA_PUBLIC
  , privateKey: process.env.RECAPTCHA_PRIVATE
  , enabled: true
  }
, port: process.env.PORT || 4000
, domain: 'http://localhost'
, model: {
    defaultAdapter: 'postgres'
  }
, db: {
    postgres: {
      user: process.env.DB_USER
    , database: process.env.DB_DATABASE
    , password: process.env.DB_PW
    , host: process.env.DB_HOST
    , port: process.env.DB_PORT
    }
  }
};

module.exports = config;
