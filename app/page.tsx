'use client';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter(); 
  const onClick = () => {
    router.push('/user');
  }
  return (
    <div>
      <h1>This is home</h1>
      <Button variant='contained' color="primary" onClick={onClick}>Click here</Button>
    </div>
  );
}

export default Home;
