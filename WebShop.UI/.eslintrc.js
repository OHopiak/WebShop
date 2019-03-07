module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		// "es6": true,
		"node": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"experimentalDecorators": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"parser": "babel-eslint",
	"rules": {
		"no-console": 0,
		// "indent": [
		// 	"error", "tab", {"SwitchCase": 1}
		// ],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"eol-last": [
			"error",
			"always"
		],
		"semi": [
			"error",
			"always"
		],
		"no-unused-vars": 0,
		"no-mixed-spaces-and-tabs": 0,
	}
};