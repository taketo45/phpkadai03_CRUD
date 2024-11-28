
const domain = location.origin;

const path = "/kadai02_db";
// if(domain === "https://transformnavi.sakura.ne.jp") {
//   path = "/kadai02_db"
// }

const selectAllUrl = domain  + path + '/selectAll.php';

const selectUrl = domain  + path + '/select.php';

const updateUrl = domain  + path + '/update.php';

const insertUrl = domain  + path + '/insert.php';

const deleteUrl = domain  + path + '/delete.php';

const postData = {};

//1ページ辺りの表示項目数のデフォルト
const maxitems = 20;

let serchlevel = 0;

const selectAll = "SELECT * FROM `vocabulary`";

const selectLimit = "SELECT * FROM `vocabulary` LIMIT ?";

const selectLimitParam =  [ maxitems ];

const selectChecked = "SELECT * FROM `vocabulary` WHERE level = ?";
