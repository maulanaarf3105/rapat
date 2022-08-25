const db = require("../models");
const Room = db.Room;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Judul Harus ada!"
    });
    return;
  }

  // Create a Tutorial
  const room = {
    title: req.body.title,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    room: req.body.room,
    desc: req.body.desc,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Room.create(room)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Kesalahan saat memesan ruangan."
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Room.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error saat mencari ruang."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Room.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `tidak bisa mencari pesanan dengan id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error saat mencari pesanan id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Room.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rooms sukses terupdate."
        });
      } else {
        res.send({
          message: `tidak bisa menemukan id=${id}. mungkin tidak ada atau req.body kosong!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error ketika mengupdate dengan id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Room.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rooms sudah sukses dihapus!"
        });
      } else {
        res.send({
          message: `tidak bisa menghapus rooms dengan id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "tidak bisa menghapus rooms dimana id=" + id
      });
    });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  Room.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} tutorial berhasil dihapus` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error ketika menghapus rooms."
      });
    });
};
