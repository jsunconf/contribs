exports.getCreatedKey = getCreatedKey;
exports.getVotedKey = getVotedKey;

function getCreatedKey (id) {
  return 'created_' + id;
}

function getVotedKey (id) {
  return 'voted_' + id;
}
