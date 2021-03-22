import React from "react";
import { FaGithubSquare, FaLinkedin, FaMedium } from "react-icons/fa";

export const links = [
  {
    id: 0,
    url: "#home",
    text: "home"
  },
  {
    id: 1,
    url: "#about",
    text: "sobre"
  },
  {
    id: 2,
    url: "#experiences",
    text: "experiência"
  },
  {
    id: 3,
    url: "#experiences",
    text: "cursos"
  },
  {
    id: 4,
    url: "#experiences",
    text: "Habilidades"
  },
  {
    id: 5,
    url: "#contact-box",
    text: "Contato"
  }
];

export const social = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/alisson-rodrigues/",
    icon: <FaLinkedin />,
    name: "LinkedIn"
  },
  {
    id: 2,
    url: "https://github.com/ar-rodrigues",
    icon: <FaGithubSquare />,
    name: "Github"
  },
  {
    id: 3,
    url: "https://medium.com/@Alisson.R",
    icon: <FaMedium />,
    name: "Medium"
  }
];
//
export const experiences = [
  {
    id: "nossacasa2019",
    order: 1,
    title: "Nossa Casa - Hub Colaborativo",
    dates: "Setembro 2019 - Fevereiro 2019",
    duties: [
      "Atividade voluntária.",
      "Elaborava materiais e estratégia de divulgação e publicacava em redes sociais."
    ],
    company: "Nossa Casa"
  },
  {
    id: "gpset2019",
    order: 2,
    title: "Grupo de Pesquisa Sociedade, Economia e Trabalho (GPSET- UFRGS)",
    dates: "Agosto 2018 - Setembro 2019",
    duties: [
      "Bolsista de iniciação científica.",
      'Auxíliei no projeto "Ação empreendedora em pequenas e médias empresas de base tecnológica".',
      "Desenvolvi atividades de pesquisa, tais como entrevistas, elaboração de relatórios e tarefas administrativas.",
      'Elaborei e apresentei o trabalho "Um estudo etnográfico sobre a ação empreendedora em startups, Brasil e México" no Salão de Iniciação Científica da UFRGS.'
    ],
    company: "GPSET"
  },
  {
    id: "wpbr2019",
    order: 3,
    title: "WPBR Marketing Digital - México",
    dates: "Julho 2019 - Setembro 2019",
    duties: [
      "Trainee internacional na cidade de Puebla no México, na área de marketing.",
      "Administrava campanhas PPC no Facebook.",
      "Criava, administrava, monitorava e otimizava campanhas no Facebook."
    ],
    company: "WPBR"
  },
  {
    id: "nitec2018",
    order: 4,
    title: "Núcleo Estudos em Inovação (NITEC - UFRGS)",
    dates: "Janeiro 2017 - Julho 2018",
    duties: [
      'Auxíliei nos projetos "Caminhos da inovação na indústria" e "Caminhos da inovação no agronegócio".',
      "Auxíliei na divulgação dos projetos, elaboração de relatórios, apresentações e tarefas administrativas.",
      'Elaborei e apresentei os trabalhos "O desenvolvimento de produtos premium em empresas do setor alimentício" e "Agregação de valor no setor de alimentos por meio da experiência do usuário".'
    ],
    company: "NITEC"
  },
  {
    id: "equilibrio2017",
    order: 5,
    title: "Equilíbrio Assessoria Econômica",
    dates: "Setembro 2016 - Maio 2017",
    duties: [
      "Trabalhei no setor de projetos e no setor financeiro, auxiliando nas atividades da Empresa Júnior."
    ],
    company: "Equilíbrio"
  },
  {
    id: "exercito2016",
    order: 6,
    title: "Exército Brasileiro",
    dates: "Março 2013 - Fevereiro 2016",
    duties: [
      "Como 3º Sargento de Comunicações, atuei no planejamento e execução de operações de campo, instalação da parte elétrica de campo, rádio e comunicação, assim como tarefas administrativas.",
      "Planejei e liderei grupamentos para atuação dentro e fora do aquartelamento, em situações de campo e operacionais."
    ],
    company: "Exército"
  }
];

export const courses = [
  {
    id: "universidade",
    title: "Bacharelado em Ciências Sociais - IFCH",
    field: "Formação",
    institution: "Universidade Federal do Rio Grande do Sul",
    dates: "2018 - atual",
    names: [
      "Bacharelado em Ciências Sociais no Instituto de Filosofia e Ciências Sociais da Universidade Federal do Rio Grande do Sul"
    ],
    certified: [],
  },
  {
    id: "marketing",
    title: "University of Illinois (Coursera)",
    field: "Marketing",
    institution: "Coursera",
    dates: "",
    names: [
      "Marketing in a Digital World",
      "Marketing Analytics in Theory",
      "Marketing Analytics in Practice",
      "Digital Media and Marketing Principles",
      "Digital Media and Marketing Strategies"
    ],
    certified: [
      //same order as names
      "https://coursera.org/share/c156010302242ad0cd36e0154fb12ed4",
      "https://coursera.org/share/1291c4191cd082cf0dd064479b72fff0",
      "https://coursera.org/share/3c1da9b8abcbaa1442861cdc3d8eb42b",
      "https://coursera.org/share/762f10dd316f5acb43ef4e8396dbce13",
      "https://coursera.org/share/61fede060428503ce4cfdcd2d134f58b"
    ]
  },
  {
    id: "exercito",
    title: "Exército Brasileiro",
    field: "Liderança",
    institution: "Exército Brasileiro",
    dates: "Junho 2013 - Novembro 2014",
    names: ["Curso de Formação de Cabos", "Curso de Formação de Sargentos"],
    certified: []
  }
];

export const skills = [
  {
    subject: "JavaScript",
    nivel: 3,
    fill: "#34a6ed"
  },
  {
    subject: "HTML",
    nivel: 3,
    fill: "#83a6ed"
  },
  {
    subject: "CSS",
    nivel: 3,
    fill: "#83a6ed"
  },
  {
    subject: "Francês",
    nivel: 3,
    fill: "#83a6ed"
  },
  {
    subject: "Espanhol",
    nivel: 4,
    fill: "#8dd1e1"
  },
  {
    subject: "Inglês",
    nivel: 5,
    fill: "#83a6ed"
  },
  {
    subject: "Português",
    nivel: 7,
    fill: "#8884d8"
  }
];

export const infos = [
  {
    id: 1,
    name: "Alisson Rodrigues",
    birth: "1994/08/24", //format: yyyy/mm/dd
    photo:
      "https://lh3.googleusercontent.com/pw/ACtC-3fFEeC-7dVdDJVXEqhtUiUbXS3LzzYMT4gkf_uo-JfzKTM9-6VGyAoWQTuE0mXItvnQ0ZXXG_t6Rhrc_E5jLt5IYpswTQqdZ-J7pAomjs7XLa1TjYpq6gsZxG4GQq6ECWxMRvbZnLEv-ZlL9OpEgZlMeQ=w908-h681-no?authuser=0",
    about:
      'Aprender, evoluir e explorar limites são os condutores de todas as experiências que escolhi. Buscar novos conhecimentos é o objetivo em todas as atividades que empreendo. Meus interesses são um misto de muitas áreas. Vão da sociedade, economia e inovação, até o marketing e programação. Acredito que a inovação depende do fluxo constante entre diferentes campos. Afinal como já dizia Lavoisier: "na natureza nada se cria e nada se perde, tudo se transforma".'
  }
];
