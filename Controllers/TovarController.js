const pool = require('../db')

class TovarController {

    async getAllTovar(req, res){
        try{
            const tovar = await pool .query(`SELECT * FROM posts`)
            res.json(tovar.rows)
        } catch (error){
            console.log(error)
        }
    }

    async createTovar(req, res) {
        const {cena, razmer, sostav, kolichestvo, opisanie} = req.body
        try {
            const tovar =await pool.query(`INSERT INTO tovar (cena, razmer, sostav, kolichestvo, opisanie) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [cena, razmer, sostav, kolichestvo, opisanie]);
            res.json(tovar.rows);
        } catch (error){
            console.error('error', error)
        }
    }

    async updateTovar(req, res){
        const id = parseInt(req.params.id, 10);
        const {cena, razmer, sostav, kolichestvo, opisanie} = req.body
        try{
            const tovar = await pool.query(`UPDATE tovar SET cena = $1,razmer = $2, sostav = $3, kolichestvo = $4, opisanie = $5 WHERE id = $6 RETURNING *`, [cena, razmer, sostav, kolichestvo, opisanie]);
            res.json(tovar.rows);
        } catch (error){
            console.error('error', error)
        }
    }

    async deleteTovar(req, res) {
        const id = req.params.id;
        const tovar = await pool.query(`DELETE FROM tovar WHERE id = $1`, [id])
        res.json(tovar.rows[0]);
    }
}
module.exports = new TovarController();
