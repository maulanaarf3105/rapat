const db = require("../models");
const Meeting = db.meeting;
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
  const meeting = {
    title: req.body.title,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    room: req.body.room,
    desc: req.body.desc,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Meeting.create(meeting)
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

  Meeting.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error saat mencari meeting."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Meeting.findByPk(id)
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

  Meeting.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "meeting sukses terupdate."
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

  Meeting.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "meeting sudah sukses dihapus!"
        });
      } else {
        res.send({
          message: `tidak bisa menghapus meeting dengan id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "tidak bisa menghapus meeting dimana id=" + id
      });
    });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  Meeting.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} tutorial berhasil dihapus` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error ketika menghapus meeting."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Meeting.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error ketika mencari meeting."
      });
    });
};
