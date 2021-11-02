
/* GET home page. */
const about = (req, res, next)=> {
    res.render('generic-text',{
        title: 'About Loc8r',
        content: 'Loc8r was created to help people find places to sit down\n' +
                'and get a bit of work done.<br/><br/>Lorem lol \n'
    }
)};

module.exports = {
    about
};
