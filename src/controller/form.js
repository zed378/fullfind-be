const { Form } = require("../../models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const mustache = require("mustache");
const template = fs.readFileSync(__dirname + "/template/index.html", "utf8");

// constant
const { mailHost, mailPass, mailUser } = require("../constant/mail");

exports.createForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      web,
      employee,
      role,
      hiring,
      references,
    } = req.body;

    const transporter = nodemailer.createTransport({
      // service: "hotmail",
      host: mailHost,
      port: 465,
      secure: true,
      // service is depends on webserver, hotmail means i am using outlook
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const optServer = {
      from: `"FullFind Mailer" <${mailUser}>`,
      to: "kembedt@gmail.com, admin@fullfind.co",
      subject: `${firstName} ${lastName} submitting form`,
      html: mustache.render(template, {
        firstName,
        lastName,
        email,
        company,
        web,
        employee,
        role,
        hiring,
        references,
      }),
    };

    await Form.create({
      firstName,
      lastName,
      email,
      company,
      web,
      employee,
      role,
      hiring,
      references,
    }).then(async (result) => {
      result &&
        (await transporter.sendMail(optServer, async (err, info) => {
          err &&
            Form.destroy({ where: { id: result.id } }).then((ress) => {
              ress &&
                res.status(500).send({
                  status: "Error",
                  message: {
                    error: err,
                    solution:
                      "Failed to sending email. Contact your administrator for help.",
                  },
                });
            });

          !err &&
            res.status(200).send({
              status: "Success",
              message: "Successfully submitted form",
            });
        }));
    });
  } catch (error) {
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
};
