import { useGetAllUsersQuery } from "@/redux/features/users/usersApi";

const Banner = () => {
  const option = {
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU0MmU1ZGQwZGEyMTRhZWNhMWNkNCIsImlhdCI6MTY5NjA3NjE4NiwiZXhwIjoxNjk3Mjg1Nzg2fQ.GlJ4AV_5yE6BWbeqzGT6OFRlMPCoU4fWsz4OeZrLoGI`,
  };
  const { data, isLoading } = useGetAllUsersQuery(option);
  console.log(data);
  if (isLoading) {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      <h2>Banner</h2>
    </div>
  );
};

export default Banner;
