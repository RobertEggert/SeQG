%% LaTeX2e class for diploma theses
%% Based on wissdoc.cls by Roland Bless, 1996-2001
%% bless@telematik.informatik.uni-karlsruhe.de
%%
%% Adapted by: Timo Rohrberg, 2009
%% timo.rohrberg@student.kit.edu
%%
%% Additions by: Thorsten Haberecht, IPD - Chair Prof. Böhm, 2010
%% thorsten.haberecht@kit.edu
%%
%% Fixes by: Max-Gerd Retzlaff, IBDS - Lehrstuhl Computergrafik, KIT, 2012
%% m.retzlaff@gmx.net

\NeedsTeXFormat{LaTeX2e}										% We do need LaTeX2e
\ProvidesClass{thesisclass}
\LoadClass[a4paper,11pt,titlepage]{scrbook}	% Class based on scrbook

%% -------------------------------
%% |          Packages           |
%% -------------------------------

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}    % switched from ISO-8859-1 / Latin1 to UTF-8 (M. Retzlaff)

% M. Retzlaff, 20121114, replaced:  (see ftp://ftp.dante.de/pub/tex/info/german/l2tabu/ )
%\usepackage{ae}               % Almost european, virtual T1-Font
% by
\usepackage{lmodern}

\usepackage[pdftex]{graphicx}
\usepackage{vmargin}          % Adjust margins in a simple way
\usepackage{fancyhdr}         % Define simple headings
\usepackage{subfigure}
\usepackage{url}
\usepackage[absolute,overlay]{textpos}
\usepackage{tikz}
\usepackage[english]{babel}
\usepackage{algorithm}		  % Code-Listings
\usepackage{algorithmic}	  % Code-Listings
% see http://www.ctan.org/tex-archive/macros/latex/contrib/algorithm2e/algorithm2e.pdf
% for more sophisticated algorithm listings

\usepackage[raiselinks=true,
						bookmarks=true,
						bookmarksopenlevel=1,
						bookmarksopen=true,
						bookmarksnumbered=true,
						hyperindex=true,
						plainpages=false,
						pdfpagelabels=true,
						pdfborder={0 0 0.5},
						colorlinks=false,
						linkbordercolor={0 0.61 0.50},
						citebordercolor={0 0.61 0.50}]{hyperref}  %{0.57 0.74 0.57}

\usepackage[fixlanguage]{babelbib}	% sets german style for literature entries
%\selectbiblanguage{ngerman}			% for \bibliographystyle{babalpha}
%% --- End of Packages ---

%% -------------------------------
%% |         New commands        |
%% -------------------------------
\newcommand{\changefont}[3]{\fontfamily{#1} \fontseries{#2} \fontshape{#3} \selectfont}
%\renewcommand*{\headfont}{\slshape}
%\newcommand{\captionfont}{}
\newcommand{\chapterheadfont}{}
\newcommand{\blankpage}{
 \clearpage{\pagestyle{empty}\cleardoublepage}
}
%% --- End of New Commands ---



%% -------------------------------
%% |      Globale Settings       |
%% -------------------------------

\setpapersize{A4}
\setmarginsrb{3cm}{1cm}{3cm}{1cm}{6mm}{7mm}{5mm}{15mm}
\setcounter{section}{1}
\parindent 0cm                     % Do not indent beginning of paragraph
\parskip1.5ex plus0.5ex minus0.5ex % Margin between paragraphs
\RedeclareSectionCommand[style=section]{chapter}
%% --- End of global Settings ---

%% -------------------------------
%% |          Headings           |
%% -------------------------------
\pagestyle{fancy}
\renewcommand{\chaptermark}[1]{\markboth{\thechapter.\ #1}{}}
\fancyhf{}
\fancyhead[LE,RO]{{\headfont\thepage}}						% Left/right header for even/odd pages
\fancyhead[LO]{\headfont\nouppercase{\rightmark}}	% Header for left page (odd)
\fancyhead[RE]{\headfont\nouppercase{\leftmark}}	% Header for right page (even)
\fancyfoot[C]{\thepage}
\renewcommand{\headrulewidth}{0.5pt}
\renewcommand{\footrulewidth}{0pt}
\fancypagestyle{plain}{%
\fancyhf{}													% No Header and Footer fields
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\fancyfoot[C]{\thepage}
}
%% --- End of Headings ---

%% ---------------------------------
%% |   Style of chapter captions   |
%% ---------------------------------
\newlength{\chapnolen}
\newlength{\chapparlen}
\newsavebox{\chapno}
\renewcommand{\@makechapterhead}[1]{
  \vspace*{0.2\textheight}
  \vskip 15\p@
  {\parindent \z@ \raggedright \normalfont
    \ifnum \c@secnumdepth >\m@ne
      \if@mainmatter
        \savebox{\chapno}{\chapterheadfont\huge\bfseries \thechapter.}
        \settowidth{\chapnolen}{\usebox{\chapno}}
        \parbox[t]{\chapnolen}{\usebox{\chapno}}\nobreak\leavevmode
      \fi
    \fi
    \interlinepenalty\@MM
    \setlength{\chapparlen}{\textwidth}
    \addtolength{\chapparlen}{-1.0\chapnolen}
    \addtolength{\chapparlen}{-2ex}
    \leavevmode\nobreak
    \parbox[t]{\chapparlen}{\raggedright\chapterheadfont\huge \bfseries #1\par\nobreak}
    \vskip 40\p@
  }}

\renewcommand{\@makeschapterhead}[1]{
  \vspace*{50\p@}
  {\parindent \z@ \raggedright
    \normalfont
    \interlinepenalty\@M
    \chapterheadfont \huge \bfseries  #1\par\nobreak
    \vskip 40\p@
  }
}
%% --- End of chapter captions style ---


%% ---------------------------------
%% |  Style of content directory   |
%% ---------------------------------
\let\oldtableofcontents\tableofcontents
\renewcommand{\tableofcontents}{{\pdfbookmark{\contentsname}{\contentsname}\chapterheadfont\oldtableofcontents}}
\let\@olddottedtocline\@dottedtocline
\renewcommand{\@dottedtocline}[5]{\@olddottedtocline{#1}{#2}{#3}{#4}{\chapterheadfont #5}}
%% --- End of content directory style ---


%% ----------------------------------
%% |  Style of appendix numbering   |
%% ----------------------------------
 \renewcommand\appendix{\par
   \setcounter{section}{0}%
   \setcounter{subsection}{0}%
   \setcounter{figure}{0}%
   \renewcommand\thesection{\Alph{section}}%
   \renewcommand\thefigure{\Alph{section}.\arabic{figure}}
   \renewcommand\thetable{\Alph{section}.\arabic{table}}}
%% --- End of appenix numbering style ---

%% **** END OF CLASS ****
