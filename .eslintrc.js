module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/forbid-prop-types": ["off", { forbid: ["any", "array", "object"] }],
      "no-console": ["off", { allow: ["warn", "error"] }]
    },
    "globals": { "fetch": false, "document": true }
};
