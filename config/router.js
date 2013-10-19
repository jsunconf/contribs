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


var router = new geddy.RegExpRouter();

router.get('/').to('Main.index');
router.get('/imprint').to('Imprint.index');

router.match('/karmas', 'POST').to('karmas.create');

router.match('/contribs', 'GET').to('contribs.index');
router.match('/contribs/add', 'GET').to('contribs.add');
router.match('/contribs', 'POST').to('contribs.create');
router.match('/contribs/:id', 'GET').to('contribs.show');
router.match('/contribs.xml', 'GET').to('contribs.xml')


router.match('/interests', 'GET').to('interests.index');
router.match('/interests/add', 'GET').to('interests.add');
router.match('/interests', 'POST').to('interests.create');
router.match('/interests/:id', 'GET').to('interests.show');
router.match('/interests.xml', 'GET').to('interests.xml')


exports.router = router;
