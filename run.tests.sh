export ENV="test";
export DATABASE_URL="postgresql://runner@localhost:5432/defaultdb"

node_modules/.bin/nyc --clean node spec.js --seed=1234
