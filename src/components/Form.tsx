import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box } from "@mui/material";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  participation: z.coerce.number().min(1, "Must be at least 1%").max(100, "Cannot exceed 100%"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
}

export default function Form({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="First Name"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Participation (%)"
        type="number"
        {...register("participation")}
        error={!!errors.participation}
        helperText={errors.participation?.message}
      />
      <Button variant="contained" type="submit">
        SEND
      </Button>
    </Box>
  );
}