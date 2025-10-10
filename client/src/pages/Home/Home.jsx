import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Home() {
  return (
    <Container maxWidth={false}>
        <Grid spacing={2}>
            <Grid item xs={12}>
            <Paper sx={{ p: 2, textAlign: "center"}}>Dashboard</Paper>
            </Grid>
        </Grid>
    </Container>
  )
}
