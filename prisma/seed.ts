import { PrismaClient } from '@prisma/client'
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url'
const dirname = fileURLToPath(new URL('./', import.meta.url))

type Country = {
  "internal row ID": number,
  "Country Name (usual)": string,
  "Country Name (short official)": string,
  "Country Name (alternative)": string,
  "Usual Country title": string,
  "Oficial country name": string,
  "Sovereignity": string,
  "2char country code": string,
  "3char country code": string,
  "numeric code": number,
  "internet TLD": string,
  "Tel. Country Code": string
};

const prisma = new PrismaClient()
async function main() {
  const importCountriesCSV = async () => {
    const headers = ["internal row ID",
    "Country Name (usual)",
    "Country Name (short official)",
    "Country Name (alternative)",
    "Usual Country title",
    "Oficial country name",
    "Sovereignity",
    "2char country code",
    "3char country code",
    "numeric code",
    "internet TLD",
    "Tel. Country Code"]

    let records: Country[] = []
    const parser = fs
    .createReadStream(`${dirname}/seed-data/countries.csv`)
    .pipe(parse({
      delimiter: ',',
      columns: headers,
      skip_empty_lines: true,
      trim: true,
      from_line: 2
    }));
    for await (const record of parser) {
      // Work with each record
      if (record["Tel. Country Code"] == '') continue
      await prisma.country.upsert({
        where: { threeChar: record["3char country code"] },
        update: {},
        create: {
          englishName: record['Country Name (usual)'],
          twoChar: record["2char country code"],
          threeChar: record["3char country code"],
          countryCode: parseInt(record["numeric code"]),
          phoneCountryCode: parseInt(record["Tel. Country Code"].substring(1))
        }
      })
    }
  }
  await importCountriesCSV()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })