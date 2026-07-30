import { seedBookings } from "./booking.seed";

import { seedServices } from "./service.seed";
export async function seedDatabase() {
  console.log("Start seeding...");

  const services = await seedServices();

  await seedBookings(services);

  console.log("Seed completed.");
}
