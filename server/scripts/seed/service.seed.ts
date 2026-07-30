import { Service } from "@/server/models/service.model";

export async function seedServices() {
  await Service.deleteMany({});

  const services = [
    {
      name: "Hair Cut",

      price: 200,

      duration: 30,

      active: true,
    },

    {
      name: "Hair Wash",

      price: 80,

      duration: 15,

      active: true,
    },

    {
      name: "Hair Color",

      price: 500,

      duration: 120,

      active: true,
    },

    {
      name: "Spa",

      price: 700,

      duration: 90,

      active: true,
    },

    {
      name: "Nail",

      price: 250,

      duration: 45,

      active: true,
    },

    {
      name: "Hair Treatment",

      price: 350,

      duration: 60,

      active: true,
    },

    {
      name: "Massage",

      price: 600,

      duration: 90,

      active: true,
    },

    {
      name: "Facial",

      price: 450,

      duration: 60,

      active: true,
    },
  ];

  const createdServices = await Service.insertMany(services);

  console.log(`✅ Seeded ${createdServices.length} services`);

  return createdServices;
}
