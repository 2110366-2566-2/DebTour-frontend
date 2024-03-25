import { string, z } from "zod";

const formSchema = z
  .object({
    tourId: z.number().int().optional(),
    name: z.string().min(1).max(50),
    startDate: z.date({
      required_error: "A start date is required",
    }),
    endDate: z.date({
      required_error: "An end date is required",
    }),
    refundDueDate: z.date({
      required_error: "A refund due date is required",
    }),
    overviewLocation: z.string().min(1).max(100),
    description: z.string().min(2).max(5000),
    price: z.number().or(z.string().regex(/\d+/).transform(Number)),
    maxMemberCount: z.array(z.number()).length(1),
    activities: z
      .array(
        z.object({
          tourId: z.number().int().optional(),
          activityId: z.number().int().optional(),
          name: z.string().min(1).max(50),
          description: z.string().min(1).max(500),
          startTimestamp: z.date(),
          endTimestamp: z.date(),
          location: z.object({
            locationId: z.number().int().optional(),
            name: z.string().min(1).max(50),
            latitude: z
              .number()
              .or(z.string().regex(/\d+/).transform(Number))
              .refine((n) => -90 <= n && n <= 90),
            longitude: z
              .number()
              .or(z.string().regex(/\d+/).transform(Number))
              .refine((n) => -180 <= n && n <= 180),
            type: z.enum([
              "Hotel",
              "Attraction",
              "Restaurant",
              "Meeting Point",
              "Other",
            ]),
            address: z.string().min(1).max(100),
          }),
        }),
      )
      .min(1)
      .max(50),
      images: z.array(string()).max(5).min(1),
  })
  .refine((data) => {
    if (data.startDate >= data.endDate) {
      return {
        message: "Start date must be before end date",
        path: ["startDate", "endDate"],
      };
    }
    return true;
  })
  .refine((data) => {
    if (data.refundDueDate >= data.startDate) {
      return {
        message: "Refund due date must be before start date",
        path: ["startDate", "refundDueDate"],
      };
    }
    return true;
  })
  .refine((data) => {
    if (data.price <= 0) {
      return { message: "Price must be more than zero", path: ["price"] };
    }
    return true;
  })
  .refine((data) => {
    if (data.activities.length > 0) {
      data.activities.forEach((activity) => {
        if (activity.startTimestamp >= activity.endTimestamp) {
          return {
            message: "Activity start date must be before end date",
            path: ["activities", "startTimestamp", "endTimestamp"],
          };
        }
      });
    }
    return true;
  })
  .refine((data) => {
    if (data.activities.length > 0) {
      data.activities.forEach((activity) => {
        if (
          activity.location.latitude < -90 ||
          activity.location.latitude > 90
        ) {
          return {
            message: "Latitude must be between -90 and 90",
            path: ["activities", "location", "latitude"],
          };
        }
      });
    }
    return true;
  })
  .refine((data) => {
    if (data.activities.length > 0) {
      data.activities.forEach((activity) => {
        if (
          activity.location.longitude < -180 ||
          activity.location.longitude > 180
        ) {
          return {
            message: "Longitude must be between -180 and 180",
            path: ["activities", "location", "longitude"],
          };
        }
      });
    }
    return true;
  })
  // .refine((data) => {
  //   if (data.images){
  //     if (data.images.length > 5) {
  //       return {
  //         message: "Maximum 5 images allowed",
  //         path: ["images"],
  //       };
  //     }
  //   }
  //   return true;
  // })
  // .refine((data) => {
  //   if (data.images){
  //     for (let i = 0; i < data.images.length; i++) {
  //       if (!data.images[i].type.includes("image")) {
  //         return {
  //           message: "Only images are allowed",
  //           path: ["images"],
  //         };
  //       }
  //     }
  //   }
  // })
  ;
export default formSchema;
