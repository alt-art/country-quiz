import { validateOrReject } from 'class-validator';

export default async function validate(body: object) {
  try {
    await validateOrReject(body, {
      validationError: { target: false },
      forbidUnknownValues: true,
    });
    return null;
  } catch (errors) {
    return errors;
  }
}
