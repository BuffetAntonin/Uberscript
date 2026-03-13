export class ApiError extends Error {
  public status: number;

  constructor(status: number) {
    let message = "Une erreur réseau est survenue.";

    if (status === 500) {
      message = "Le serveur du restaurant est en panne (Erreur 500).";
    } else if (status === 404) {
      message = "La carte du restaurant est introuvable (Erreur 404).";
    } else if (status === 403) {
      message = "Accès refusé au menu (Erreur 403).";
    }

    super(message);
    
    this.name = "ApiError";
    this.status = status;
  }
}

export class TropPauvreErreur extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TropPauvreErreur";
  }
}