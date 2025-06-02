export enum MedicalSpecialty {
  CARDIOLOGY = "Cardiologia",
  DERMATOLOGY = "Dermatologia",
  HEMATOLOGY = "Hematologia",
  NEUROLOGY = "Neurologia",
  OBSTETRICS_GYNECOLOGY = "Ginecologia e Obstetrícia",
  OPHTHALMOLOGY = "Oftalmologia",
  ORTHOPEDICS = "Ortopedia",
  OTOLARYNGOLOGY = "Otorrinolaringologia",
  PEDIATRICS = "Pediatria",
  PSYCHIATRY = "Psiquiatria",
  RADIOLOGY = "Radiologia",
  GENERAL_SURGERY = "Cirurgia Geral",
  UROLOGY = "Urologia",
}

export const MedicalSpecialties = Object.entries(MedicalSpecialty).map(
  ([key, value]) => ({
    value: MedicalSpecialty[key as keyof typeof MedicalSpecialty],
    label: value,
  }),
);
