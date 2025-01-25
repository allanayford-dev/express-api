function readJSONFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				return reject(new Error(err))
			}

			try {
				resolve(JSON.parse(data))
			} catch (parseErr) {
				reject(new Error(parseErr))
			}
		})
	})
}

module.exports = readJSONFile
