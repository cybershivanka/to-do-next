import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';

// Use require for the resume-parser library
const ResumeParser = require('resume-parser');

const customParsingRules = {
  additionalContactInfo: {
    pattern: /Additional\s*Contact\s*Info:(.*)/i,
    extract: (match: RegExpMatchArray) => match[1].trim()
  },
};

const customParsingTemplates = {
  education: {
    pattern: /Education:(.*)/,
    extract: (match: RegExpMatchArray) => match[1].trim()
  },
  workExperience: {
    pattern: /Work\s*Experience:(.*)/,
    extract: (match: RegExpMatchArray) => match[1].trim()
  },
  skills: {
    pattern: /Skills:(.*)/,
    extract: (match: RegExpMatchArray) => match[1].trim()
  },
  certifications: {
    pattern: /Certifications:(.*)/,
    extract: (match: RegExpMatchArray) => match[1].trim()
  },
};

const parseResume = async (filePath: string) => {
  return new Promise<any>((resolve, reject) => {
    ResumeParser.parseResumeFile(filePath, customParsingRules, customParsingTemplates, (output: any) => {
      resolve(output);
    }, (error: any) => {
      reject(error);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function parser(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm({
    uploadDir: 'uploads/',
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const file = (files.resume as File);
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const parsedData = await parseResume(file.filepath);
      // Clean up the uploaded file after parsing
      fs.unlinkSync(file.filepath);
      res.status(200).json(parsedData);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing resume' });
    }
  });
}
