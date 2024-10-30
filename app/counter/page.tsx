'use client'
import { useCounterStore } from "@/stores";
import { Button, Card, CardContent, Grid2 } from "@mui/material";

const Counter = () => {
    const store = useCounterStore();
    return (
        <>
            <div className="flex justify-center h-screen items-center">
                <Card variant="outlined">
                    <CardContent>
                        <Grid2 spacing={2} container>
                            <Grid2 className="flex justify-center" size={12}>
                                <h1 className="text-5xl">{store.count}</h1>
                            </Grid2>
                            <Grid2 className="flex justify-center" size={12}>
                                <Button variant="contained" color="success" onClick={store.inc}>Increase</Button>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </div>
        </>
    )
};

export default Counter;