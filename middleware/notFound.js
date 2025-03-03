/* MIDDLEWARE
    Este se activa al momento de errar la url de la pagina
 */
module.exports = (req, res, next) => {
    res.status(404).end();
}