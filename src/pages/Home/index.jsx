import { useForm } from "react-hook-form";
import { useHomeContext } from "../../hooks/useHomeContext";
import { Domain } from "../components/Domain";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Field,
  Form,
  InfoAside,
  Label,
  Page,
  ErrorMessage,
  PageContainer,
  ResultContainer,
  SearchContainer,
  SearchInput,
  Subtitle,
  TitleContainer,
} from "./styles";

const Home = () => {
  const { searchDomain, domains } = useHomeContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: {  isSubmitting },
  } = useForm();

  const onSubmit = async ({ domain }) => {
    try {
      await searchDomain(domain);
      reset();
    } catch {
      notify("Campo de domínio obrigatório.");
    }
  };

  const notify = (errorMessage) => toast(errorMessage);

  return (
    <Page>
      <PageContainer>
        <InfoAside>
          <TitleContainer>
            <Subtitle>
              verifique se seu domínio já foi registrado no Brasil
            </Subtitle>
            <Label>
              digite o domínio para consultar
              <br />
              suas informações
            </Label>
          </TitleContainer>
          <SearchContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Field>
                <SearchInput
                  type="text"
                  placeholder="domínio"
                  {...register("domain")}
                />               
              </Field>
              <Button type="submit" disabled={isSubmitting}>
                consultar
              </Button>
            </Form>
          </SearchContainer>
        </InfoAside>
        <ResultContainer>
          {domains.map((domain) => (
            <Domain domain={domain} />
          ))}
        </ResultContainer>
      </PageContainer>
    </Page>
  );
};

export default Home;
