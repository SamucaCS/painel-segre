(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  // ---------- ELEMENTOS ----------
  const btnFale = $("#btnFaleConosco");
  const btnAcompanhar = $("#btnAcompanhar");

  const modalFale = $("#modalFale");
  const btnCloseFale = $("#btnCloseFale");
  const formFale = $("#formFale");
  const resultBox = $("#resultBox");
  const btnAbrirEmail = $("#btnAbrirEmail");
  const btnFecharResultado = $("#btnFecharResultado");
  const btnIrAcompanhar = $("#btnIrAcompanhar");

  const resProtocolo = $("#resProtocolo");
  const resPrazo = $("#resPrazo");
  const resStatus = $("#resStatus");

  // VIDA ESCOLAR
  const btnVidaEscolar = $("#btnVidaEscolar");
  const modalVida = $("#modalVida");
  const btnCloseVida = $("#btnCloseVida");
  const btnCliqueAquiVida = $("#btnCliqueAquiVida");
  const formVida = $("#formVida");
  const resultVida = $("#resultVida");
  const btnIrAcompanharVida = $("#btnIrAcompanharVida");
  const btnFecharVidaResultado = $("#btnFecharVidaResultado");
  const btnAbrirEmailVida = $("#btnAbrirEmailVida");

  const resVidaProtocolo = $("#resVidaProtocolo");
  const resVidaPrazo = $("#resVidaPrazo");
  const resVidaStatus = $("#resVidaStatus");
  const resVidaAnexos = $("#resVidaAnexos");

  // ACOMPANHAR
  const modalAcompanhar = $("#modalAcompanhar");
  const btnCloseAcompanhar = $("#btnCloseAcompanhar");
  const inpProtocolo = $("#inpProtocolo");
  const btnBuscarProtocolo = $("#btnBuscarProtocolo");
  const trackResult = $("#trackResult");
  const trackEmpty = $("#trackEmpty");

  const trkProtocolo = $("#trkProtocolo");
  const trkSolicitante = $("#trkSolicitante");
  const trkEstudante = $("#trkEstudante");
  const trkRA = $("#trkRA");
  const trkStatus = $("#trkStatus");
  const trkPrazo = $("#trkPrazo");
  const trkData = $("#trkData");

  // MATRÍCULAS
  const btnMatriculas = $("#btnMatriculas");
  const menuMatriculas = $("#menuMatriculas");
  const topicTitle = $("#topicTitle");
  const topicBody = $("#topicBody");
  const topicBadge = $("#topicBadge");

  // ---------- HELPERS ----------
  const pad2 = (n) => String(n).padStart(2, "0");

  function ymdCompact(date = new Date()) {
    return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
  }

  function randTail(len = 6) {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
  }

  // ✅ protocolos sem traços na data (AAAAMMDD)
  function genProtocolSEGRE() {
    return `SEGRE-${ymdCompact()}-${randTail(6)}`;
  }

  function genProtocolSEVESC() {
    return `SEVESC-${ymdCompact()}-${randTail(6)}`;
  }

  function prettyDate(date = new Date()) {
    return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()} ${pad2(
      date.getHours()
    )}:${pad2(date.getMinutes())}`;
  }

  function addBusinessDays(startDate, businessDays) {
    const d = new Date(startDate);
    let added = 0;
    while (added < businessDays) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return d;
  }

  function openModal(el) {
    if (!el) return;
    el.classList.add("open");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(el) {
    if (!el) return;
    el.classList.remove("open");
    el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // storage (local)
  function storageKey(protocol) {
    return `segre_protocol_${protocol}`;
  }

  function saveProtocol(record) {
    localStorage.setItem(storageKey(record.protocol), JSON.stringify(record));
  }

  function getProtocol(protocol) {
    const raw = localStorage.getItem(storageKey(protocol));
    return raw ? JSON.parse(raw) : null;
  }

  const TOPICS = {
    foraRede: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE INSCRIÇÃO DE ESTUDANTE FORA DA REDE PÚBLICA",
      html: `
        <p>
          Esta inscrição se dá quando o aluno maior de idade, ou seu responsável não possui matrícula ativa em escola pública do Estado de São Paulo,
          bem como estudantes oriundos de outros países, estados ou Rede Privada de Ensino.
        </p>
        <div class="callout">
          <p><strong>Formas de realizar a inscrição:</strong></p>
          <p>1) <strong>Presencialmente:</strong> em qualquer escola pública (municipal ou estadual) ou postos do Poupatempo;</p>
          <p>2) <strong>On-line:</strong> realizando uma pré-inscrição conforme tutorial abaixo.</p>
          <p><strong>Tutorial Pré-Inscrição On-line:</strong> <a href="https://midiasstoragesec.blob.core.windows.net/001/2023/08/tutorial-pr-inscrio-online_2024_com-escolha-de-if.pdf" target="_blank" rel="noopener">Clique aqui</a></p>
        </div>
      `
    },

    transfEndereco: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE TRANSFERÊNCIA ESCOLAR – COM ALTERAÇÃO DE ENDEREÇO",
      html: `
        <p>
          Esta inscrição destina-se ao estudante que mudou de endereço residencial, quando essa mudança impede a permanência do aluno na escola anterior.
          Nesta modalidade o sistema SED – Secretaria Escolar Digital realiza a matrícula do estudante na escola pública mais próxima possível, em que houver a vaga,
          até o limite de 2,0 Km do endereço residencial informado.
        </p>
        <div class="callout">
          <p><strong>Formas de realizar a inscrição:</strong></p>
          <p>1) <strong>On-line:</strong> através do perfil do responsável legal ou aluno maior de 18 anos na SED no endereço
            <a href="https://sed.educacao.sp.gov.br/" target="_blank" rel="noopener">https://sed.educacao.sp.gov.br/</a>
          </p>

          <p><strong>Acesso no perfil do Responsável (1º acesso):</strong></p>
          <p>login: número do RG + dígito do RG + UF do RG (Exemplo: rg123456789sp)</p>
          <p>Caso ainda não esteja cadastrado(a), solicite o cadastro na secretaria da escola do(a) aluno(a).</p>
          <p>Senha 1º acesso: número do CPF (Exemplo: 32165498722)</p>

          <p><strong>Acesso aluno maior de 18 anos (1º acesso):</strong></p>
          <p>Login: número do RA + dígito do RA + UF do RA (Exemplo: 987654321sp)</p>
          <p>
            O RA (Registro do Aluno) é o número de identificação do aluno no Sistema de Cadastro de Alunos da Secretaria da Educação do Estado de São Paulo.
            Para saber seu RA, consulte a secretaria de sua escola.
          </p>
          <p>Senha 1º acesso: Data de Nascimento sem as barras (Exemplo: 31122003)</p>

          <p>2) <strong>Presencialmente:</strong> em qualquer unidade escolar ou postos do Poupatempo.</p>
        </div>
      `
    },

    transfIntencao: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE TRANSFERÊNCIA ESCOLAR – POR INTENÇÃO (PREFERÊNCIA DE ESCOLA)",
      html: `
        <p>
          Esta inscrição se dá quando o aluno maior de idade, ou seu responsável, tem <strong>PREFERÊNCIA/ INTENÇÃO</strong>, por determinada escola.
          Nesta modalidade o sistema SED – Secretaria Escolar Digital realiza a matrícula do estudante, exclusivamente, na (s) escola (s) de inscrição,
          à medida em que surgem vagas na série/ escola (s) escolhida, obedecendo a ordem cronológica de inscritos.
          Enquanto aguarda a vaga, o aluno deverá frequentar a escola atual.
        </p>
        <div class="callout">
          <p><strong>Formas de realizar a inscrição:</strong></p>
          <p>1) <strong>On-line:</strong> através do perfil do responsável legal ou aluno maior de 18 anos na SED no endereço
            <a href="https://sed.educacao.sp.gov.br/" target="_blank" rel="noopener">https://sed.educacao.sp.gov.br/</a>
          </p>

          <p><strong>Acesso no perfil do Responsável (1º acesso):</strong></p>
          <p>login: número do RG + dígito do RG + UF do RG (Exemplo: rg123456789sp)</p>
          <p>Caso ainda não esteja cadastrado(a), solicite o cadastro na secretaria da escola do(a) aluno(a).</p>
          <p>Senha 1º acesso: número do CPF (Exemplo: 32165498722)</p>

          <p><strong>Acesso aluno maior de 18 anos (1º acesso):</strong></p>
          <p>Login: número do RA + dígito do RA + UF do RA (Exemplo: 987654321sp)</p>
          <p>
            O RA (Registro do Aluno) é o número de identificação do aluno no Sistema de Cadastro de Alunos da Secretaria da Educação do Estado de São Paulo.
            Para saber seu RA, consulte a secretaria de sua escola.
          </p>
          <p>Senha 1º acesso: Data de Nascimento sem as barras (Exemplo: 31122003)</p>

          <p>2) <strong>Presencialmente:</strong> em qualquer unidade escolar ou postos do Poupatempo.</p>

          <p><strong>Importante:</strong> Ao fim do semestre letivo, os responsáveis, estudantes maiores de idade ou emancipados deverão confirmar a manutenção do interesse
          registrado na inscrição de intenção de transferência e a falta dessa confirmação acarretará o cancelamento da inscrição.</p>
        </div>
      `
    },

    noturno: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE VAGA NO PERÍODO NOTURNO",
      html: `
        <p>
          Os responsáveis podem realizar uma inscrição por <strong>INTENÇÃO</strong> (presencialmente ou online), atendidos os critérios abaixo especificados.
          Saiba como realizar a inscrição no assunto “<strong>INFORMAÇÕES SOBRE INSCRIÇÃO POR INTENÇÃO</strong>”.
        </p>
        <div class="callout">
          <p><strong>RESOLUÇÃO SEDUC Nº 115, DE 13 DE AGOSTO DE 2025</strong></p>
          <p><strong>Artigo 16</strong> O atendimento no período noturno para estudantes do Ensino Médio destina-se, prioritariamente, aos estudantes trabalhadores, observado o disposto no Decreto Federal nº 6.481, de 12 de junho de 2008, e a efetivação da matrícula, manualmente, dar-se-á mediante os seguintes critérios:</p>

          <p><strong>I</strong> – Para estudantes de quatorze anos de idade completos a dezesseis anos de idade incompletos, na condição de Jovem Aprendiz, é necessária a apresentação de contrato formal de Jovem Aprendiz, nos termos da Lei n° 10.097/2000, contendo:</p>
          <p>a) Dados do empregador; b) Dados do responsável; c) Dados do estudante; d) Horário de exercício do trabalho e carga horária.</p>

          <p><strong>II</strong> – Para estudantes com idade a partir de dezesseis anos, na condição de empregado com registro em Carteira de Trabalho e Previdência Social – CTPS, com apresentação da cópia da CTPS;</p>
          <p><strong>III</strong> – Declaração, emitida nos últimos trinta (30) dias, pelo empregador, identificando o local, horário de exercício do trabalho e carga horária;</p>
          <p><strong>IV</strong> – Para estudantes com idade a partir de dezesseis anos, na condição de estagiário, com apresentação de termo de compromisso ou declaração de vínculo emitida nos últimos trinta (30) dias pela entidade ou empresa com a qual possui vínculo, identificando local, horário de exercício das atividades e carga horária;</p>
          <p><strong>V</strong> – Para estudantes com idade a partir de quatorze anos, na condição de atleta, com apresentação de declaração emitida no ano corrente pelo clube ou entidade com a qual possui vínculo, identificando local e horário de exercício das atividades e carga horária;</p>
          <p><strong>VI</strong> – Para estudantes com idade a partir de dezesseis anos, em regime familiar de trabalho, conforme legislação, com assinatura de termo de ciência dos responsáveis, emitida no ano corrente;</p>
          <p><strong>VII</strong> – Para estudantes com autorização judicial de exercício de atividades artísticas, circenses, teatrais ou outras, mediante apresentação da decisão judicial que permita o exercício;</p>
          <p><strong>VIII</strong> – Para estudantes com idade a partir de dezesseis anos, na condição de trabalhador autônomo, mediante apresentação de declaração emitida nos últimos trinta (30) dias, firmada pelo próprio estudante ou responsável legal, contendo a descrição da atividade desenvolvida, horário e carga horária, com a devida ciência.</p>

          <p><strong>§1º</strong> – Em conformidade com o Estatuto da Criança e do Adolescente – ECA (Lei nº 8.069/1990), em especial nos artigos 4º, 53 e 60, e com o Decreto Federal nº 6.481, de 12 de junho de 2008, é vedado o trabalho perigoso, insalubre e noturno ao adolescente, inclusive na condição de aprendiz ou trabalhador autônomo. Identificada qualquer situação de risco ou violação de direitos, a Unidade Escolar ou a Unidade Regional de Ensino deverá acionar a rede de proteção à criança e ao adolescente.</p>

          <p><strong>§2º</strong> – A comprovação do exercício das atividades/condições que constam neste artigo, a fim de garantir a vaga no período noturno, deverá ser atualizada semestralmente.</p>

          <p><strong>§3º</strong> – Os casos omissos ou não tratados neste artigo são passíveis de análise e autorização da Unidade Regional de Ensino, mediante solicitação de próprio punho dos responsáveis legais ou cadastrado do estudante.</p>

          <p><strong>§4º</strong> – A mera apresentação da documentação que comprova a necessidade de atendimento no período noturno não garante o atendimento, sendo que a disponibilização da vaga ocorrerá mediante ociosidade de vagas e análise das condições apresentadas.</p>
        </div>
      `
    },

    profissional: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE OFERTA DE EDUCAÇÃO PROFISSIONAL",
      html: `
        <p>
          Nas escolas estaduais do Estado de São Paulo, a oferta da Educação Profissional ocorre a partir da <strong>2ª Série do Ensino Médio</strong>,
          mediante manifestação de interesse do estudante e responsável na chamada pública no ano imediatamente anterior e está condicionada às vagas existentes no curso e escola escolhidos,
          distância da residência e <strong>IAE (Índice de Alocação do Estudante)</strong>.
        </p>
      `
    },

    eja: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE A EDUCAÇÃO DE JOVENS E ADULTOS",
      html: `
        <div class="callout">
          <p>✓ Para ingresso no Ensino Fundamental na modalidade EJA, de curso presencial, mantido por escola pública estadual, possuir <strong>15 (quinze) anos</strong> de idade completos no primeiro dia do ano letivo subsequente ou na data do início da sua matrícula, no decorrer do ano letivo;</p>
          <p>✓ Para ingresso no Ensino Médio na modalidade EJA, de curso presencial, mantido por escola pública estadual, possuir <strong>18 (dezoito) anos</strong> de idade completos no primeiro dia do ano letivo subsequente ou na data do início da sua matrícula, no decorrer do ano letivo;</p>
          <p>✓ Para ingresso na EJA, de curso de presença flexível, ofertado por escola pública estadual no âmbito dos Centros Estaduais de Educação de Jovens e Adultos – CEEJA e suas escolas vinculadas, possuir <strong>18 (dezoito) anos</strong> de idade completos no primeiro dia do ano letivo subsequente ou na data do início da sua matrícula, no decorrer do ano letivo.</p>
        </div>

        <p>
          Para saber como realizar a inscrição, acesse o assunto <strong>INFORMAÇÕES FORA DA REDE/ TRANSFERÊNCIA OU INTENÇÃO</strong>.
        </p>
      `
    },

    irmaos: {
      badge: "Matrículas",
      title: "INFORMAÇÕES SOBRE O ATENDIMENTO DE IRMÃOS EM MESMA ETAPA DE ENSINO",
      html: `
        <p>
          Para garantir o acesso vagas no mesmo estabelecimento a irmãos que frequentem a mesma etapa ou ciclo de ensino da educação básica é necessário que os responsáveis informem
          no momento da inscrição para vaga na escola pública ou por transferência, a ocorrência de irmãos para o sistema SED – Secretaria Escolar Digital faça a alocação de vaga em uma mesma escola.
        </p>

        <p>
          Nos casos em que essa alocação ocorrer em escolas diferentes, os responsáveis podem comunicar a escola de alocação, realizando nova inscrição para ajuste.
          As matrículas serão alocadas na escola que consiga atender todos os irmãos, coincidindo ou não com a escola de preferência dos responsáveis, respeitados os critérios de distância estabelecidos na legislação vigente.
        </p>

        <p>
          Quando os irmãos já estão atendidos em uma mesma escola e, por INTENÇÃO (preferência de escola), os responsáveis optarem por uma troca para outra escola,
          há uma descaracterização da prioridade no atendimento. Essas novas inscrições serão atendidas pelo sistema à medida em que surgem vagas na série/ escola (s) escolhida,
          obedecendo a ordem cronológica de inscritos. Enquanto aguarda a vaga, os alunos deverão frequentar a escola de origem.
        </p>
      `
    },

    transporte: {
      badge: "Matrículas",
      title: "INFORMAÇÃO SOBRE TRANSPORTE ESCOLAR REGULAR",
      html: `
        <p>
          O transporte escolar gratuito é concedido para estudantes que não possuem escola pública com atendimento do seu ano/ série até 2,0 Km do seu endereço residencial.
        </p>
        <p>
          O atendimento do estudante inscrito por Intenção de Transferência, descaracteriza o direito ao transporte escolar, devendo a escola informar seus responsáveis quando da realização dessa inscrição/atendimento.
          (RESOLUÇÃO SEDUC Nº 115, DE 13 DE AGOSTO DE 2025, artigo 28).
        </p>
        <p>
          O transporte especial, voltado para estudantes da Educação Especial deve ser solicitado diretamente na unidade escolar.
        </p>
      `
    }
  };
  // ---------- DROPDOWN MATRÍCULAS ----------
  function toggleMenu(open) {
    if (!menuMatriculas || !btnMatriculas) return;
    const willOpen =
      typeof open === "boolean" ? open : !menuMatriculas.classList.contains("open");
    menuMatriculas.classList.toggle("open", willOpen);
    btnMatriculas.setAttribute("aria-expanded", String(willOpen));
    menuMatriculas.setAttribute("aria-hidden", String(!willOpen));
  }

  btnMatriculas?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", () => toggleMenu(false));
  menuMatriculas?.addEventListener("click", (e) => e.stopPropagation());

  menuMatriculas?.querySelectorAll(".menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-topic");
      const t = TOPICS[key];
      if (!t) return;

      topicBadge.textContent = t.badge;
      topicTitle.textContent = t.title;
      topicBody.innerHTML = t.html;

      toggleMenu(false);
      $("#topicCard")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---------- VIDA ESCOLAR (SEÇÃO) ----------
  btnVidaEscolar?.addEventListener("click", () => {
    topicBadge.textContent = "Vida Escolar";
    topicTitle.textContent = "Seção de Vida Escolar";
    topicBody.innerHTML = `
      <p class="muted">
        Clique abaixo para solicitar sua documentação (vida escolar, diploma/certificação e outros).
      </p>
      <div class="callout">
        <button class="btn primary" id="btnAbrirVidaEscolarInline">Para mais dúvidas, fale com a Seção de Vida Escolar</button>
      </div>
    `;

    $("#topicCard")?.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      $("#btnAbrirVidaEscolarInline")?.addEventListener("click", () => openVidaModal());
    }, 0);
  });

  function openVidaModal() {
    if (!modalVida) return;
    formVida.hidden = false;
    resultVida.hidden = true;
    formVida.reset();
    openModal(modalVida);
  }

  btnCliqueAquiVida?.addEventListener("click", (e) => {
    e.preventDefault();
    formVida.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  btnCloseVida?.addEventListener("click", () => closeModal(modalVida));
  modalVida?.addEventListener("click", (e) => {
    if (e.target === modalVida) closeModal(modalVida);
  });

  btnIrAcompanharVida?.addEventListener("click", () => {
    closeModal(modalVida);
    openModal(modalAcompanhar);
    inpProtocolo?.focus();
  });

  btnFecharVidaResultado?.addEventListener("click", () => closeModal(modalVida));

  // ---------- MODAL FALE CONOSCO (SAMAT) ----------
  btnFale?.addEventListener("click", () => {
    formFale.hidden = false;
    resultBox.hidden = true;
    formFale.reset();
    openModal(modalFale);
  });

  btnCloseFale?.addEventListener("click", () => closeModal(modalFale));
  modalFale?.addEventListener("click", (e) => {
    if (e.target === modalFale) closeModal(modalFale);
  });

  btnIrAcompanhar?.addEventListener("click", () => {
    closeModal(modalFale);
    openModal(modalAcompanhar);
    inpProtocolo?.focus();
  });

  btnFecharResultado?.addEventListener("click", () => closeModal(modalFale));

  // ---------- SUBMIT SAMAT ----------
  formFale?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(formFale);
    const prazo = addBusinessDays(new Date(), 5).toISOString();

    const record = {
      type: "SAMAT",
      protocol: genProtocolSEGRE(),
      createdAt: new Date().toISOString(),
      prazo,
      status: "Recebido",
      solicitante: (fd.get("solicitante") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      telefone: (fd.get("telefone") || "").toString().trim(),
      estudante: (fd.get("estudante") || "").toString().trim(),
      ra: (fd.get("ra") || "").toString().trim(),
      filiacao: (fd.get("filiacao") || "").toString().trim(),
      relato: (fd.get("relato") || "").toString().trim(),
      destino: "suz.semat@educacao.sp.gov.br",
    };

    saveProtocol(record);

    const subject = `SEGRE | Solicitação | Protocolo ${record.protocol}`;
    const body = `Protocolo: ${record.protocol}
Prazo para retorno: ${new Date(record.prazo).toLocaleDateString("pt-BR")}
Status inicial: ${record.status}

Nome do solicitante: ${record.solicitante}
E-mail: ${record.email}
Telefone: ${record.telefone}

Nome do estudante: ${record.estudante}
RA: ${record.ra}
Filiação: ${record.filiacao}

Relato breve:
${record.relato}

Data de abertura: ${prettyDate(new Date(record.createdAt))}
`;

    const mailto = `mailto:${encodeURIComponent(record.destino)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    btnAbrirEmail.href = mailto;

    resProtocolo.textContent = record.protocol;
    resPrazo.textContent = new Date(record.prazo).toLocaleDateString("pt-BR");
    resStatus.textContent = record.status;

    formFale.hidden = true;
    resultBox.hidden = false;

    inpProtocolo.value = record.protocol;

    // ✅ abre automaticamente
    window.location.href = mailto;
  });

  // ---------- SUBMIT SEVESC ----------
  formVida?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(formVida);
    const files = Array.from(formVida.querySelector('input[name="anexos"]')?.files || []);
    const fileNames = files.map((f) => f.name);

    const prazo = addBusinessDays(new Date(), 5).toISOString();

    const record = {
      type: "SEVESC",
      protocol: genProtocolSEVESC(),
      createdAt: new Date().toISOString(),
      prazo,
      status: "Recebido",
      email: (fd.get("email") || "").toString().trim(),
      nome: (fd.get("nome") || "").toString().trim(),
      nascimento: (fd.get("nascimento") || "").toString().trim(),
      rg: (fd.get("rg") || "").toString().trim(),
      telefone: (fd.get("telefone") || "").toString().trim(),
      mae: (fd.get("mae") || "").toString().trim(),
      obs: (fd.get("obs") || "").toString().trim(),
      anexos: fileNames,
      destino: "suz.sevesc@educacao.sp.gov.br",
    };

    saveProtocol(record);

    const subject = `SEVESC | Solicitação Vida Escolar | Protocolo ${record.protocol}`;
    const body = `Protocolo: ${record.protocol}
Prazo para retorno: ${new Date(record.prazo).toLocaleDateString("pt-BR")}
Status inicial: ${record.status}

E-mail: ${record.email}
Nome completo: ${record.nome}
Data de nascimento: ${record.nascimento}
RG: ${record.rg}
Telefone: ${record.telefone}
Nome da mãe: ${record.mae}

Anexar o documento neste corpo de Email:
${record.anexos.length ? record.anexos.map((n) => `- ${n}`).join("\n") : "- (nenhum)"}

Observações:
${record.obs}

Data de abertura: ${prettyDate(new Date(record.createdAt))}

IMPORTANTE: Anexar os PDFs selecionados antes de enviar este e-mail.
`;

    const mailto = `mailto:${encodeURIComponent(record.destino)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    btnAbrirEmailVida.href = mailto;

    resVidaProtocolo.textContent = record.protocol;
    resVidaPrazo.textContent = new Date(record.prazo).toLocaleDateString("pt-BR");
    resVidaStatus.textContent = record.status;
    resVidaAnexos.textContent = record.anexos.length ? record.anexos.join(", ") : "(nenhum)";

    formVida.hidden = true;
    resultVida.hidden = false;

    inpProtocolo.value = record.protocol;

    // ✅ abre automaticamente
    window.location.href = mailto;
  });

  // ---------- MODAL ACOMPANHAR ----------
  btnAcompanhar?.addEventListener("click", () => {
    openModal(modalAcompanhar);
    inpProtocolo?.focus();
  });

  btnCloseAcompanhar?.addEventListener("click", () => closeModal(modalAcompanhar));
  modalAcompanhar?.addEventListener("click", (e) => {
    if (e.target === modalAcompanhar) closeModal(modalAcompanhar);
  });

  function renderTrack(record) {
    trackEmpty.hidden = true;
    trackResult.hidden = false;

    trkProtocolo.textContent = record.protocol;

    trkSolicitante.textContent = record.solicitante || record.nome || "—";
    trkEstudante.textContent = record.estudante || "—";
    trkRA.textContent = record.ra || "—";

    trkStatus.textContent = record.status || "—";
    trkPrazo.textContent = record.prazo
      ? new Date(record.prazo).toLocaleDateString("pt-BR")
      : "—";
    trkData.textContent = record.createdAt
      ? prettyDate(new Date(record.createdAt))
      : "—";
  }

  function clearTrack(msg) {
    trackResult.hidden = true;
    trackEmpty.hidden = false;
    trackEmpty.innerHTML = `<p class="muted">${msg}</p>`;
  }

  btnBuscarProtocolo?.addEventListener("click", () => {
    const protocol = (inpProtocolo.value || "").trim();
    if (!protocol) {
      clearTrack("Digite um protocolo para buscar.");
      return;
    }
    const record = getProtocol(protocol);
    if (!record) {
      clearTrack(
        "Protocolo não encontrado neste dispositivo. Verifique o número ou tente no mesmo aparelho em que a solicitação foi registrada."
      );
      return;
    }
    renderTrack(record);
  });

  inpProtocolo?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnBuscarProtocolo?.click();
    }
  });
})();
