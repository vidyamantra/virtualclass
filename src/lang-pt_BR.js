(function (window) {
  /**
   * {virtualclass1} {virtualclass2} are elements you passes with getString function eg:-
   *   virtualclass.lang.getString('operaBrowserIssue', ['opeara', 27]);
   *   opera and 27 will be replaced over the {virtualclass1} and {virtualclass2} respectively for particular line of
   *   language file.
   * @type type
   */
  const message = {
    ActiveAll: 'Ativar todos',
    addcontext: 'Adicionar marcador de páginas',
    Addoption: 'Adicionar opção',
    addnew: 'Adicionar novo',
    adminusr: 'Usuário admin',
    appPrerequites: 'Validar requerimentos do sistema',
    assign: 'Atribuir',
    assignDisable: 'Retomar controles',
    askplayMessage: '<span id="askplaymsg"> Devemos começar a sessão?</span><br />'
    + '<span id="remaingmsg">Os dados restantes serão baixados em paralelo.</span>',
    askplaymsg: '<span id="askplaymsg"> "Download em progresso, clique Play para iniciar </span>"',
    audioInput: 'Entrada de áudio',
    audiolatency: 'Latência de áudio',
    audioOutput: 'Saída de áudio',
    audioDisable: 'Desmutar',
    audioEnable: 'Mutar',
    addQuestion: 'Adicionar questão',
    addContext: 'Adicionar Marcador de Páginas',
    answer: 'Respostas',
    action: 'Ações',
    audioTest: 'Sua voz será gravada e tocada de volta para você. \n Pressione Ok e fale algo por uns segundos.',
    Back: 'Voltar',
    bandfast: 'Conectividade de rede ótima',
    bandmedium: 'Conectividade de rede devagar',
    bandslow: 'Falha na conectividade de rede',
    bandwitdhImageNotFound: 'Download da imagem falhou, por favor clique em "Próximo" para continuar.',
    becomeTeacher: 'Virar professor',
    Binary_Limit_Exeed: 'Alerta: Alto uso BN',
    bulkUserActions: 'Ações em massa do usuário',
    ByInstructor: 'Pelo instrutor',
    ByTimer: 'Pelo cronômetro',
    cancel: 'Cancelar',
    canvasDrawMsg: 'Você pode clicar em qualquer ferramenta de desenho '
    + 'clique e segure o botão esquerdo do mouse para desenhar',
    canvasmissing: 'Canvas está faltando no seu browser. Favor atualizar seu browser para a última versão.',
    chatEnable: 'Desabilitar bate-papo',
    Chatroom: 'Sala de bate-papo',
    Circle: 'Círculo',
    ClearAll: 'Limpar tudo',
    clickheretoplay: 'Clique aqui para dar Play',
    clicktoplay: 'Play',
    chatDisable: 'Habilitar bate-papo',
    chFireBrowsersIssue: 'Seu browser {virtualclass1} {virtualclass2} precisa atualizar.'
    + ' Congrea suporta Chrome 40+ e Firefox 35+.',
    clearAllWarnMessageW: 'Você realmente quer limpar este quadro branco?',
    clearAllWarnMessageD: 'Você realmente quer limpar estes desenhos?',
    closedsDbheading: 'Fechar o painel de documento',
    closeSharePresentationdbHeading: 'Fechar o painel de apresentação',
    closevideoDashboard: 'Fechar painel de vídeo',
    closeVoting: 'Fechar votação',
    cnmissing: 'Número de pedaço está faltando',
    CodeEditor: 'Editor de código',
    cof: 'Conexão desligada',
    collaborate: 'Colaborar',
    commonChat: 'Bate-papo comum',
    commonBrowserIssue: 'Seu browser {virtualclass1} {virtualclass2} não é suportado.'
    + ' Use a última versão do Chrome ou Firefox.',
    congreainchrome: 'Seu browser é compatível.',
    confirmCancel: 'Não',
    confirmOk: 'Sim',
    connectionClose: 'Conexão está fechada ({virtualclass1}).',
    Controls: 'Controles',
    coursePoll: 'Enquete a nível do curso',
    Cpoll: 'Enquete do curso',
    Cquiz: 'Fechar quiz',
    createnewpoll: 'Criar nova enquete',
    Creator: 'Criador',
    comment: 'Comentários',
    dap: 'falso',
    delete: 'Deletar',
    delblank: 'Remover a opção em branco',
    Delete: 'Deletar',
    DevicesNotFoundError: 'Webcam não está disponível, ou não está conectada corretamente.',
    deletepopup: 'Tem certeza que deseja deletar ?',
    disable: 'Desabilitar',
    disabled: 'desabilitado',
    disableAllVideo: 'Desabilitar todo vídeo',
    dltDisabled: 'Pode ser deletado pelo criador da enquete',
    documentShare: 'Compartilhar documento',
    DocumentSharing: 'Compartilhamento de documento',
    DocumentSharedbHeading: 'Painel de documento',
    docUploadSuccess: 'Documento enviado com sucesso',
    download: 'Baixar',
    downloadFile: 'Baixar arquivo',
    downloadsession: 'Favor aguardar enquanto a gravação é baixada',
    drawArea: 'Área de desenho',
    dropfilehere: 'Solte os arquivos aqui',
    duplicateUploadMsg: 'Este arquivo já existe, por favor envie um novo arquivo.',
    edit: 'Editar',
    editorCode: 'Editor de código',
    edittitle: 'Editar título',
    editorRichDisable: 'Modo de escrita',
    editorRichEnable: 'Apenas leitura',
    educator: 'Educador',
    EHTMLPresentUrl: 'Inserir URL da apresentação HTML5',
    enable: 'Habilitar',
    enablehistory: '"Histórico do navegador" precisa estar habilitado durante a sessão.',
    enableAllVideo: 'Habilitar todo vídeo',
    enteryouryoutubeurl: 'Inserir URL de vídeo online ou YouTube',
    etDisabledA: 'Não pode editar, enquete já foi tentada',
    etDisabledCr: 'Pode ser editada pelo criador da enquete',
    ETime: 'Tempo decorrido',
    FF2: 'Acelerar x2',
    FF8: 'Acelerar x8',
    filenotsave: 'Seu arquivo não pode ser salvo.',
    filetsaveTS: 'A sessão está pronta para salvar.',
    Finish: 'Finalizar',
    fitToPage: 'Ajustar à página',
    fitToScreen: 'Ajustar à tela',
    Freehand: 'Mão livre',
    general: 'Geral',
    Greport: 'Relatório de nota',
    highBandWidthSpeed: 'Sua banda larga é boa o suficiente.',
    httpsmissing: 'Apenas origens seguras(https) são permitidas para compartilhamento de tela.',
    ieBrowserIssue: 'Internet Explorer não é suportado, Congrea suporta completamente Chrome  e Firefox.',
    ios7support: 'Para Apple, Sala Virtual suporta iOS 8 e versões superiores.',
    iosAudEnable: 'Toque aqui para habilitar áudio',
    InternalError: 'Por favor, certifique-se que a mesma webcam não está sendo usada <br />'
    + ' em múltiplos browsers ou múltiplas aplicações. ',
    invalidcmid: 'Id de módulo do curso inválido.',
    invalidurl: 'URL inválida',
    indvprogress: 'Tarefa atual',
    InsertimageURL: 'Inserir URL da imagem',
    JoinClassMsg: 'Juntar-se à Sala de Aula',
    JoinSession: 'Juntar-se à sessão',
    keymissing: 'A chave do seu software(LMS/CMS) está faltando',
    Line: 'Linha',
    lowBandWidthSpeed: 'Sua banda larga é muito baixa, nós vamos parar o vídeo.'
    + ' Você ainda poderá ouvir o áudio e ver a tela.',
    maxCommonChat: 'Mostrar janela de bate-papo',
    Max_rooms: 'Erro: Limite de máximo de salas alcançado',
    Max_users: 'Erro: Limite de máximo de usuários alcançado',
    media: 'Mídia',
    mediumBandWidthSpeed: 'Sua banda larga é limitada,'
    + ' nós vamos reduzir a qualidade do vídeo de acordo com a banda larga disponível.',
    minCommonChat: 'Esconder janela de bate-papo',
    minoption: 'Inserir pelo menos duas opções',
    microphoneNotConnected: 'Microfone não está disponível, ou não está devidamente conectado',
    // 'mictesting' : 'Se a barra de áudio acima oscilar enquanto fala, seu microfone está funcionando.',
    mictesting: 'Seu microfone está funcionando se a barra de áudio acima oscilar <br />'
    + 'e você conseguir ouvir sua própria voz, enquanto fala',
    minute: 'Minuto',
    ModeclosingPoll: 'Modo de fechamento de Enquete :',
    msgForDownloadStart: 'Incapaz de salvar os dados. <br /> Preparando dados para download',
    msgForReload: 'Favor recarregar esta página para continuar editando.',
    msgForWhiteboard: 'Quadro branco vazio.',
    msgStudentForReload: 'Favor recarregar esta página.',
    Multiple_login: 'Erro: Acesso negado, múltiplos logins',
    muteAll: 'Mutar todos',
    muteAllAudio: 'Mutar todo áudio',
    mybsharedoc: 'Documento será compartilhado logo',
    NAME: 'NOME',
    Next: 'Próximo',
    note: 'Adicionar anotação',
    nomdlroot: 'Não há url para a raíz momodle.',
    normalView: 'Visualização normal',
    noResultStd: 'Você não tem permissão para ver o resultado',
    NotAllowedError: 'Webcam está desabilitada',
    NotFoundError: 'Webcam não está disponível, ou não está devidamente conectada.',
    NotReadableError: 'Favor certifique-se que a mesma webcam não está sendo usada <br />'
    + ' em múltiplos browsers ou múltiplas aplicações.',
    notsupportbrowser: '{virtualclass1} não é completamente compatível.'
    + ' Para a melhor experiência, use o Google Chrome.',
    NotSupportedError: 'Somente origens seguras(https) são permitidas para áudio e vídeo',
    notSupportIphone: 'Desculpe. A sala virtual não suporta smartphones.',
    noPoll: 'Não há nenhuma questão disponível para a enquete. Vá em ‘Adicionar novo’ para criar uma questão.',
    noPollNoAdmin: 'Não há nenhuma questão disponível para a enquete de site.'
    + ' Só o admin pode criar enquete a nível de site.',
    noQuiz: `Não há nenhum Quiz disponível. Adicione um quiz do seu Moodle.
    Congrea suporta apenas questões de múltipla escolha.`,
    Novote: 'Nenhum voto recebido para esta enquete',
    nowebcam: 'Webcam não está disponível, ou não está devidamente conectada.',
    nowebcamconnectedyet: 'Congrea não recebeu nenhuma entrada do usuário ainda.',
    notcompatiblecpu: 'Poder de processamento (CPU) no sistema é baixo. <br /> Nós recomendamos usar uma CPU moderna.',
    notcompatibleram: 'RAM no sistema é baixo. <br /> Nós recomendamos 4GB de RAM.',
    offcollaboration: 'Colaboração desligada',
    oncollaboration: 'Colaboração ligada',
    opendsDbheading: 'Painel de documento',
    openSharePresentationdbHeading: 'Painel de apresentação',
    openvideoDashboard: 'Painel de vídeo',
    operaBrowserIssue: 'Seu browser {virtualclass1} {virtualclass2} é parcialmente suportado.'
    + ' Você não poderá compartilhar sua tela. Congrea suporta completamente Chrome e Firefox',
    Options: 'Opções',
    optselectd: 'OPÇÃO SELECIONADA',
    Oval: 'Oval',
    overallprogress: 'Progresso geral',
    Pause: 'Pausar',
    pclosetag: '<span>Tem certeza que deseja fechar esta enquete?  </span>',
    pclose: 'Tem certeza que deseja fechar a votação?',
    Pclosed: 'Enquete fechada',
    pdfnotrender: 'Há um problema no carregamento da janela, favor recarregar browser.',
    Pdsuccess: 'Enquete deletada com sucesso',
    PEdit: 'Editar enquete',
    PermissionDeniedError: 'Acesso à Webcam foi negado.',
    PERMISSION_DENIED: 'Você negou acesso à sua Webcam(câmera/microfone).',
    Play: 'Play',
    playsessionmsg: 'Clique ‘Play’ para iniciar a sessão.',
    pleasewaitWhSynNewCont: 'Favor aguardar. Sincronizando novo conteúdo.',
    plswaitwhile: 'Favor aguardar....',
    pool: 'Enquete',
    pollblank: 'Questão não pode ser deixada em branco',
    pollCancel: 'Fechar',
    pollDel: 'Tem certeza que deseja deletar esta enquete?',
    pollHead: 'Votar nesta enquete',
    pollmaybeshown: 'Enquete será publicada',
    pollmybpublish: 'Enquete será publicada em breve',
    pollresult: 'Resultado anterior',
    ppoll: 'Publicar enquete',
    PQuestions: 'Questões da enquete',
    PQuiz: 'Publicar quiz',
    Precheck: 'Pré-checagem',
    precheckStart: 'Pré-checagem',
    prechkcmplt: 'Pré-checagem completa',
    Presult: 'Resultado da enquete',
    preWllBshortly: 'Apresentação será compartilhada em breve',
    Prev: 'Ant',
    proposedspeed: 'Velocidade proposta',
    PSetting: 'Configuração da enquete',
    Publish: 'Publicar',
    QClosed: 'Quiz fechado',
    Question: 'Questão',
    Quiz: 'Quiz',
    'Quiz/page': 'Quiz / página',
    Quizes: 'Quizzes',
    quizmayshow: 'Prepare-se para um quiz',
    quizreviewpublish: 'Revisar e publicar quiz',
    RaiseHandStdDisabled: 'Abaixar mão',
    RaiseHandEnable: 'Mão levantada',
    raiseHandNotify: 'Estudante(s) com mão levantada',
    RaiseHandStdEnabled: 'Levantar mão',
    readonlymode: 'Apenas leitura',
    receivedVotes: 'Votos recebidos',
    reclaim: 'Retomar',
    Rectangle: 'Retângulo',
    rejected: 'Outra aplicação no seu computador pode estar usando sua Webcam.'
    + ' Favor fechar todas as outras aplicações',
    recarregar: 'Recarregar',
    reloadDoc: 'Recarregar documento',
    removeContext: 'Remover Marcador de Páginas',
    replay: 'Replay',
    Replay: 'Replay do começo.',
    replay_message: 'Obrigado por assistir.',
    requestScreenShare: 'Pedir compartilhamento de tela',
    requestedScreenShare: 'Compartilhamento de tela foi pedido',
    Reset: 'Redefinir',
    Rtime: 'Tempo restante',
    rusureCquiz: '<span>Tem certeza que deseja fechar o quiz? </span>',
    rvtu: 'Votos recebidos/ total de usuários',
    reply: 'Responder',
    safariBrowserIssue: 'Seu browser Safari {virtualclass1} não é suportado.'
    + ' Nós suportamos completamente o Chrome e o Firefox',
    Save: 'Salvar',
    savesession: 'Deseja salvar a sessão atual?',
    savesessionTechSupport: 'Deseja salvar a sessão atual? <br />'
    + ' Uma vez baixada a sessão, atualizações não serão disponíveis ao baixar novamente a mesma sessão.',
    screensharealready: 'A tela está sendo compartilhada.',
    ScreenShare: 'Compartilhamento de tela',
    screensharemsg: 'A tela acima está sendo compartilhada.',
    screensharenotsupport: 'Compartilhamento de tela não é suportado',
    screensharedenied: 'Usuário negou o compartilhamento de tela',
    second: 'Segundo',
    selfview: 'Desabilitar visualização pública',
    SetTimer: 'Definir cronômetro',
    sesseionkeymissing: 'A chave da sessão está faltando no Front End.', // from javascript
    sentPackets: 'Enviar <br/><span>Pacotes</span>',
    // 'sessionend': "Fechar sessão.",
    SessionEnd: 'Fim da sessão',
    sessionexpired: 'Sessão vencida',
    sessionendmsg: 'Sessão foi fechada. Você pode fechar seu browser agora.',
    setting: 'Configuração',
    Searchuser: 'Buscar usuário',
    compartilhar: 'Compartilhar',
    ShareVideo: 'Compartilhar vídeo',
    shareAnotherYouTubeVideo: 'Compartilhar outro vídeo do YouTube',
    SharePresentation: 'Compartilhar apresentação',
    SharePresentationdbHeading: 'Painel de apresentação',
    sharetoall: 'Habilitar visualização pública',
    Showresulttostudents: 'Mostrar resultado aos estudantes',
    sitePoll: 'Enquete a nível de site',
    Skip: 'Fechar',
    someproblem: 'Há um problema no envio do arquivo. Favor tentar novamente.',
    SourceUnavailableError: 'Favor certifique-se que a mesma Webcam não está sendo usada em múltiplos browsers'
    + ' ou múltiplas aplicações.',
    // 'SourceUnavailableError' : 'Outra aplicação no seu computador pode estar usando a Webcam.'
    // + ' Favor fechar tais aplicações.',
    speakerTest: 'Se você consegue ouvir música, as caixas de som estão funcionando.',
    Spoll: 'Enquete de site',
    ssBtn: 'Parar compartilhamento',
    ssStop: 'Parar compartilhamento de tela',
    startnewsession: 'Você realmente quer encerrar esta sessão?',
    status: 'Status',
    stdPublish: 'stdPublish',
    stdscreenshare: 'Deseja compartilhar sua tela?',
    studentAudEnable: 'Áudio do estudante habilitado',
    studentSafariBrowserIssue: 'Seu browser {virtualclass1} {virtualclass2}'
    + ' não pode compartilhar sua Webcam com outros usuários. Congrea suporta completamente Chrome e Firefox.',
    supportDesktop: 'Sala Virtual não suporta tablets nem smartphones. Para apresentar, favor usar um computador.',
    supportDesktopOnly: 'Desculpe, o modo de apresentador só suporta computadores.'
    + ' Tablets e smartphones não são suportados.',
    teacherSafariBrowserIssue: 'Safari não suporta a funcionalidade de apresentador.'
    + ' Favor trocar para Chrome ou Firefox.',
    techsupport: 'Suporte técnico',
    testingbrowser: 'Testando compatibilidade com o browser',
    testinginternetspeed: 'Testando velocidade da internet',
    testingmichrophone: 'Testando microfone',
    testingspeaker: 'Testando caixa de som',
    testingwebcam: 'Testando Webcam',
    Text: 'Texto',
    Text_Limit_Exeed: 'Alerta: Alto uso TX',
    TextEditor: 'Editor de texto',
    textPlaceholder: 'Inserir texto aqui',
    Time: 'Tempo',
    Tmyclose: 'Professor pode fechar esta enquete a qualquer momento',
    total: 'Total',
    totalprogress: 'Progresso total',
    tpAudioTest: 'Testar áudio',
    transferControls: 'Transferir controles',
    Triangle: 'Triângulo',
    Udocument: 'Upload de documento',
    Unauthenticated: 'Erro: Acesso inválido',
    unmuteAll: 'Desmutar todos',
    uploadsession: 'Favor aguarde até o processamento acabar',
    uploadvideo: 'Upload de vídeo',
    uploadedsession: 'Sua sessão se encerrou. Você já pode fechar sua janela '
    + ' ou fechar este popup para iniciar uma nova sessão.',
    usermissing: 'Usuário está faltando',
    userList: 'Lista de usuários',
    upvote: 'Votar a favor',
    instructorVideo: 'Vídeo do professor',
    validateurlmsg: 'URL inválida',
    VCE2: 'Sem permissão para gravar sessão',
    VCE4: 'Dados de registro estão faltando',
    VCE5: 'Incapaz de Registrar Dados.',
    VCE6: 'Módulo de curso está faltando.',
    VideodbHeading: 'Painel de vídeo',
    videoInput: 'Entrada de vídeo',
    videooff: 'Vídeo desligado',
    videoon: 'Vídeo ligado',
    videoquality: 'Qualidade do vídeo',
    virtualclassnoteHeader: 'Adicionar Anotação',
    VotedSoFar: 'Votos recebidos até agora',
    votesuccess: 'Seu voto foi enviado com sucesso. O resultado será mostrado em breve.',
    votesuccessPbt: 'Voto enviado com sucesso. Você não tem permissão para ver o resultado.',
    Vwllbshrshortly: 'Vídeo será compartilhado em breve',
    viewall: 'Ver tudo',
    waitmsgconnect: 'Favor aguarde um pouco. A aplicação está tentando se conectar.',
    watstdrespo: 'Esperando a resposta do estudante',
    wbrtcMsgChrome: 'Você pode clicar no botão de negação para não compartilhar seu microfone e câmera com o Congrea.'
    + 'ou clicar no botão de permitir para compartilhá-los.',
    wbrtcMsgFireFox: 'Você pode clicar em "Compartilhar Dispositivos Selecionados"'
    + ' para compartilhar seu microfone e câmera com outros usuários',
    webcamerainfo: 'Se vídeo está visível, a Webcam está funcionando.',
    Whiteboard: 'Quadro branco',
    writemode: 'Modo de escrita',
    youtubeshare: 'Compartilhar vídeo do YouTube',
    youTubeUrl: 'Inserir URL de vídeo do YouTube',
    zoomIn: 'Mains zoom',
    zoomOut: 'Menos zoom',
    noain: 'Sem entrada de áudio',
    noaout: 'Sem saída de áudio',
    novideo: 'Sem vídeo',
    enableAllAudio: 'Desmutar tudo',
    disableAllAudio: 'Mutar tudo',
    colorSelector: 'Cor',
    strk: 'Tamanho do pincel',
    font: 'Tamanho da fonte',
    fullScreen: 'Tela cheia',
    exitFullScreen: 'Sair da tela cheia',
    recordingText: 'gravando',
    recordingStopped: 'Gravação parada',
    recordingStarted: 'Gravação iniciada',
    continueText: 'Clique aqui para continuar',
    continue: 'Continuar',
    black: 'preto',
    'dark-gray-4': 'cinza escuro 4',
    'dark-gray-3': 'cinza escuro 3',
    'dark-gray-2': 'cinza escuro 2',
    'dark-gray-1': 'cinza escuro 1',
    gray: 'cinza',
    'light-gray-1': 'cinza claro 1',
    'light-gray-2': 'cinza claro 2',
    'light-gray-3': 'cinza claro 3',
    white: 'branco',
    'red-berry': 'vermelho cereja',
    red: 'vermelho',
    orange: 'laranja',
    yellow: 'amarelo',
    green: 'verde',
    cyan: 'ciano',
    'cornflower-blue': 'azul flor de milho',
    blue: 'azul',
    purple: 'roxo',
    magenta: 'magenta',
    'light-red-berry-3': 'vermelho cereja claro 3',
    'light-red-berry-2': 'vermelho cereja claro 2',
    'light-red-berry-1': 'vermelho cereja claro 1',
    'dark-red-berry-1': 'vermelho cereja escuro 1',
    'dark-red-berry-2': 'vermelho cereja escuro 2',
    'dark-red-berry-3': 'vermelho cereja escuro 3',
    'light-red-3': 'vermelho claro 3',
    'light-red-2': 'vermelho claro 2',
    'light-red-1': 'vermelho claro 1',
    'dark-red-1': 'vermelho escuro 1',
    'dark-red-2': 'vermelho escuro 2',
    'dark-red-3': 'vermelho escuro 3',
    'light-orange-3': 'laranja claro 3',
    'light-orange-2': 'laranja claro 2',
    'light-orange-1': 'laranja claro 1',
    'dark-orange-1': 'laranja escuro 1',
    'dark-orange-2': 'laranja escuro 2',
    'dark-orange-3': 'laranja escuro 3',
    'light-yellow-3': 'amarelo claro 3',
    'light-yellow-2': 'amarelo claro 2',
    'light-yellow-1': 'amarelo claro 1',
    'dark-yellow-1': 'amarelo escuro 1',
    'dark-yellow-2': 'amarelo escuro 2',
    'dark-yellow-3': 'amarelo escuro 3',
    'light-green-3': 'verde claro 3',
    'light-green-2': 'verde claro 2',
    'light-green-1': 'verde claro 1',
    'dark-green-1': 'verde escuro 1',
    'dark-green-2': 'verde escuro 2',
    'dark-green-3': 'verde escuro 3',
    'light-cyan-3': 'ciano claro 3',
    'light-cyan-2': 'ciano claro 2',
    'light-cyan-1': 'ciano claro 1',
    'dark-cyan-1': 'ciano escuro 1',
    'dark-cyan-2': 'ciano escuro 2',
    'dark-cyan-3': 'ciano escuro 3',
    'light-cornflower-blue-3': 'azul flor do milho claro 3',
    'light-cornflower-blue-2': 'azul flor do milho claro 2',
    'light-cornflower-blue-1': 'azul flor do milho claro 1',
    'dark-cornflower-blue-1': 'azul flor do milho escuro 1',
    'dark-cornflower-blue-2': 'azul flor do milho escuro 2',
    'dark-cornflower-blue-3': 'azul flor do milho escuro 3',
    'light-blue-3': 'azul claro 3',
    'light-blue-2': 'azul claro 2',
    'light-blue-1': 'azul claro 1',
    'dark-blue-1': 'azul escuro 1',
    'dark-blue-2': 'azul escuro 2',
    'dark-blue-3': 'azul escuro 3',
    'light-purple-3': 'roxo claro 3',
    'light-purple-2': 'roxo claro 2',
    'light-purple-1': 'roxo claro 1',
    'dark-purple-1': 'roxo escuro 1',
    'dark-purple-2': 'roxo escuro 2',
    'dark-purple-3': 'roxo escuro 3',
    'light-magenta-3': 'magenta claro 3',
    'light-magenta-2': 'magenta claro 2',
    'light-magenta-1': 'magenta claro 1',
    'dark-magenta-1': 'magenta escuro 1',
    'dark-magenta-2': 'magenta escuro 2',
    'dark-magenta-3': 'magenta escuro 3',
    Shapes: 'Formas',
    disableAllChat: 'Desabilitar bate-papo privado',
    enableAllChat: 'Habilitar bate-papo privado',
    disableAllGroupChat: 'Desabilitar bate-papo comum',
    enableAllGroupChat: 'Habilitar bate-papo comum',
    disableAllRaisehand: 'Desabilitar levantar mão',
    enableAllRaisehand: 'Habilitar levantar mão',
    disableAllAskQuestion: 'Desabilitar levantar questão',
    enableAllAskQuestion: 'Habilitar levantar questão',
    disableAllQaMarkNotes: 'Desabilitar marcações e anotações',
    enableAllQaMarkNotes: 'Habilitar marcações e anotações',
    disableAllUserlist: 'Desabilitar lista de usuários',
    enableAllUserlist: 'Habilitar lista de usuários',
    Audio: 'áudio',
    Video: 'vídeo',
    Chat: 'bate-papo privado',
    GroupChat: 'bate-papo comum',
    RaiseHand: 'levantar mão',
    UserList: 'lista de usuários',
    uploading: 'Processando...',
    userListHeader: 'Usuários ',
    commonChatHeader: 'Sala de Bate-papo',
    teacherVideoHeader: 'Vídeo do professor',
    askQuestionHeader: 'Levantar Questão',
    questionLable: 'Questão',
    answerLable: 'Resposta',
    commentLable: 'Comentário',
    markAnswer: 'Marcar como Resposta',
    markNotes: 'Marcações e Anotações',
    askQuestionTimeExceed: 'Incapaz de editar/deletar pois você já excedeu o tempo limite',
    upvoted: 'Incapaz de editar/deletar pois um voto a favor já foi adicionado',
    enterText: 'Inserir o texto antes de postar',
    more: '...Mais',
    less: 'Menos',
    askQuestion: 'Levantar questão',
    MarksAndNotes: 'Marcações e Anotações',
    markAnswerUnmark: 'Você precisa primeiro desmarcar a resposta já marcada',
    /* For Chrome */
    PermissionDeniedErrorExt: '<div class="errorMsg"> Acesso à câmera foi bloqueado.'
    + ' Para providenciar acesso à Webcam, favor seguir os procedimentos abaixo <br />'
    + 'Vá para o ícone de câmera no topo direito da tela <br /> '
    + 'Clique na opção "Sempre permitir..." e selecione a opção de câmera <br />  '
    + 'Clique em finalizado e recarregue a tela  </div> <div class="screenImages">'
    + ' <figure class="chrome" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-vídeo.png" >'
    + ' <figcaption>Chrome</figcaption> </figure></div>',

    SecurityErrorExt: '<div class="errorMsg"> Acesso à câmera foi bloqueado.'
    + ' Para providenciar acesso à Webcam, favor seguir os procedimentos abaixo <br />'
    + 'Vá para o ícone de câmera no topo direito da tela <br /> '
    + 'Clique na opção "Sempre permitir..." e selecione a opção de câmera <br />  '
    + 'Clique em finalizado e recarregue a tela  </div> <div class="screenImages">'
    + ' <figure class="chrome" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-vídeo.png" >'
    + ' <figcaption>Chrome</figcaption> </figure></div>',

    nopermissionExt: '<div class="errorMsg"> Acesso à câmera foi bloqueado.'
    + ' Para providenciar acesso à Webcam, favor seguir os procedimentos abaixo <br />'
    + 'Vá para o ícone de câmera no topo direito da tela <br /> '
    + 'Clique na opção "Sempre permitir..." e selecione a opção de câmera <br />  '
    + 'Clique em finalizado e recarregue a tela  </div> <div class="screenImages">'
    + ' <figure class="chrome" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-vídeo.png" >'
    + ' <figcaption>Chrome</figcaption> </figure></div>',

    chromeExtMiss: "Congrea precisa do plugin 'Desktop Selector' para compartilhar a Tela.<br />"
    + 'Você pode baixá-lo '
    + "<a href='https://chrome.google.com/webstore/detail/desktop-selector/ijhofagnokdeoghaohcekchijfeffbjl'"
    + " target='_blank'>AQUI.</a>",


    /* For Firefox */
    PermissionDeniedErrorExtFF: '<div class="errorMsg"> Acesso à câmera foi bloqueado.'
    + ' Para providenciar acesso à Webcam, favor seguir os procedimentos abaixo <br />'
    + 'Vá para o ícone de câmera no topo esquerdo da tela <br /> '
    + 'Clique na opção "Compartilhar Dispositivo Selecionado"'
    + '<div class="screenImages">'
    + '<figure class="firefox" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-screnshare.png" >'
    + ' <figcaption>Chrome</figcaption> </figure></div>',
    screensharereload: 'Screen is not being compartilhada. Favor recarregar for the compartilhamento.',

    SecurityErrorExtFF: '<div class="errorMsg"> Acesso à câmera foi bloqueado.'
    + ' Para providenciar acesso à Webcam, favor seguir os procedimentos abaixo <br />'
    + 'Vá para o ícone de câmera no topo esquerdo da tela <br /> '
    + 'Clique na opção "Compartilhar Dispositivo Selecionado"'
    + '<div class="screenImages">'
    + '<figure class="firefox" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-screnshare.png" >'
    + ' <figcaption>Chrome</figcaption> </figure></div>',

    nopermissionExtFF: '<div class="errorMsg"> Acesso à câmera foi bloqueado.'
    + ' Para providenciar acesso à Webcam, favor seguir os procedimentos abaixo <br />'
    + 'Vá para o ícone de câmera no topo esquerdo da tela <br /> '
    + 'Clique na opção "Compartilhar Dispositivo Selecionado"'
    + '<div class="screenImages">'
    + '<figure class="firefox" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-screnshare.png" >'
    + ' <figcaption>Chrome</figcaption> </figure></div>',
    TypeError: 'Sua Webcam não foi inicializada corretamente. Favor recarregar a página.',
    newPage: 'Inserir página',
  };
  // window.message = message;
  window.congreaLanguages.pt_Br = message;
}(window));
