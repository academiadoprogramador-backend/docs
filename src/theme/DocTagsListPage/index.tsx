import { useState, type ReactNode } from "react";
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import Heading from "@theme/Heading";
import SearchMetadata from "@theme/SearchMetadata";
import TagsListByLetter from "@theme/TagsListByLetter";
import type { Props } from "@theme/DocTagsListPage";
import styles from "./styles.module.css";

function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

export default function DocTagsListPage({ tags }: Props): ReactNode {
  const [search, setSearch] = useState("");
  const query = normalizeSearch(search.trim());
  const filteredTags = tags.filter((tag) =>
    normalizeSearch(`${tag.label} ${tag.description ?? ""}`).includes(query),
  );

  return (
    <HtmlClassNameProvider className={ThemeClassNames.page.docsTagsListPage}>
      <PageMetadata
        title="Assuntos"
        description="Busque assuntos e encontre as aulas relacionadas."
      />
      <SearchMetadata tag="doc_tags_list" />
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--8 col--offset-2">
            <Heading as="h1">Assuntos</Heading>
            <p>Busque um assunto e selecione uma tag para encontrar as aulas relacionadas.</p>
            <div className={styles.search}>
              <label htmlFor="tag-search">Buscar assuntos</label>
              <input
                id="tag-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ex.: C#, SQL Server, autenticação"
                aria-controls="tag-results"
              />
            </div>
            <p role="status">
              {filteredTags.length} de {tags.length} assuntos encontrados.
            </p>
            <div id="tag-results">
              {filteredTags.length > 0 ? (
                <TagsListByLetter tags={filteredTags} />
              ) : (
                <p className="margin-vert--lg">
                  Nenhum assunto encontrado. Tente outro termo.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </HtmlClassNameProvider>
  );
}
