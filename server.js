const app = require("./app");

// ============= End Setup =============//

const start = (port) => {
  try {
    app.listen(port, () =>
      console.log(
        `hahahahaha you are good to goo in http://localhost:${port}/  DDDDDDDD...`
      )
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start(4000);
