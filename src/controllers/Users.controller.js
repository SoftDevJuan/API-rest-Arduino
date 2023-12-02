import { getConnection } from "./../database/database";

//-----------------------------------------------------------------------------------------

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM user");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getName = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM user WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


//-----------------------------------------------------------------------------------------
const verifyUser = async (req, res) => {
    try {
        const { rfid } = req.body;

        if (rfid === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
            return;
        }

        const user = { rfid };
        const connection = await getConnection();
        const [results] = await connection.query("CALL RegistrarAcceso(?)", [user.rfid]);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//-------------------------------------------------------------------------------------------

const addUser = async (req, res) => {
    try {
        const { id, name, status } = req.body;

        if (id === undefined ||name === undefined || status === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const User = {id, name, status };
        const connection = await getConnection();
        await connection.query("INSERT INTO User SET ?", User);
        res.json({ message: "User added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        if (id === undefined || name === undefined || status === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const User = { name, status };
        const connection = await getConnection();
        const result = await connection.query("UPDATE User SET ? WHERE id = ?", [User, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM user WHERE id = ?", id);
        res.json("Usuario Eliminado");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsers,
    getName,
    verifyUser,
    addUser,
    updateUser,
    deleteUser
};
