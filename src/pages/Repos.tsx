import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// import { useFetch } from "./hooks/useFetch";

export type Repository = {
  full_name: string;
  description: string;
};

function Repos() {
  const { data, isFetching } = useQuery<Repository[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/erik-ferreira/repos"
      );

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
    }
  );

  // const { data: repositories, isFetching } = useFetch<Repository[]>(
  //   "https://api.github.com/users/erik-ferreira/repos"
  // );

  return (
    <div>
      {isFetching && <p>Carregando...</p>}
      <ul>
        {data?.map((repository) => (
          <li key={repository.full_name}>
            <Link to={`repo/${repository.full_name}`}>
              {repository.full_name}
            </Link>
            <p>{repository.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Repos };
