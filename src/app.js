const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
	return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
	const { title, url, techs } = req.body;

	const repositorie = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(repositorie);

	return res.status(200).json(repositorie);
});

app.put('/repositories/:id', (req, res) => {
	const { id } = req.params;

	const checkRepositorie = repositories.find(
		(repositorie) => id === repositorie.id
	);

	if (!checkRepositorie) {
		return res
			.status(400)
			.json({ error: true, message: 'The repository doesnt exist' });
	}

	return res.status(200).json(checkRepositorie);
});

app.delete('/repositories/:id', (req, res) => {
	const { id } = req.params;

	const checkRepositorie = repositories.find(
		(repositorie) => id === repositorie.id
	);

	if (!checkRepositorie) {
		return res
			.status(400)
			.json({ error: true, message: 'The repository doesnt exist' });
	}
});

app.post('/repositories/:id/like', (req, res) => {});

module.exports = app;
