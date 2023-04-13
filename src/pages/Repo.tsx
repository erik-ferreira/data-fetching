import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repos";

export function Repo() {
  const params = useParams();
  const currentRepo = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    // await queryClient.invalidateQueries(["repos"]);

    // Request para alterar a descrição

    const previousRepos = queryClient.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepo) {
          return { ...repo, description: "testando o mal" };
        } else {
          return repo;
        }
      });

      queryClient.setQueryData("repos", nextRepos);
    }
  }

  return (
    <div>
      <h1>{currentRepo}</h1>

      <button onClick={handleChangeRepositoryDescription}>
        Alterar descrição
      </button>
    </div>
  );
}
