export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class TropPauvreErreur extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TropPauvreErreur";
  }
}