const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
	const { title, id } = req.query;

	if (title) {
		const result = repositories.filter(repository => repository.title.includes(title));
		res.status(200).json(result)
	}

	if (id) {
		const result = repositories.find(repository => repository.id === id);
		res.status(200).json(result)
	}

	return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
	const { title, url, techs, likes = 0 } = req.body;

	const repositorie = {
		id: uuid(),
		title,
		url,
		techs,
		likes,
	};

	repositories.push(repositorie);

	return res.status(200).json(repositorie);
});

app.put('/repositories/:id', (req, res) => {
	const { id } = req.params;
	const { title, techs, url } = req.body;

	const repositorieIndex = repositories.findIndex(
		(repository) => id === repository.id
	);

	if (repositorieIndex < 0) {
		return res
			.status(400)
			.json({ error: 'The repository doesnt exist'});
	}

	const repositorie = repositories.find(repository => repository.id === id);


	const updateRepositorie = {
		...repositorie,
		title,
		url,
		techs,
	};

	repositories[repositorieIndex] = updateRepositorie;

	return res.status(200).json(updateRepositorie);
});

app.delete('/repositories/:id', (req, res) => {
	const { id } = req.params;

	const repositorieIndex = repositories.findIndex(repository =>
		repository.id === id
	);


	if (repositorieIndex < 0) {
		return res
			.status(400)
			.json({
				error: 'The repository doesnt exist',
			});
	}

	repositories.splice(repositorieIndex, 1);

	return res.status(204).send();
});

app.post('/repositories/:id/like', (req, res) => {
	const { id } = req.params;

	const repositorieIndex = repositories.findIndex(repository =>
		repository.id === id
	);

	if (repositorieIndex < 0) {
		return res.status(400).json({ error: "Repository not found." })
	};


	const repositorie = repositories.find(repository => repository.id === id);
	const updateRepositorie = {
		...repositorie,
		likes: repositorie.likes += 1
	};

	repositories[repositorieIndex] = repositorie;

	return res.status(200).json(updateRepositorie)
});

module.exports = app;
