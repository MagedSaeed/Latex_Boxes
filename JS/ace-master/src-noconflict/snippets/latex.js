ace.define("ace/snippets/latex",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = "# Prototype\n\
snippet \\alpha\n\
	\\alpha\n\
snippet \\beta\n\
	\\beta\n\
snippet \\Gamma\n\
	\\Gamma\n\
snippet \\gamma\n\
	\\gamma\n\
snippet \\Delta\n\
	\\Delta\n\
snippet \\delta\n\
	\\delta\n\
snippet \\epsilon\n\
	\\epsilon\n\
snippet \\zeta\n\
	\\zeta\n\
snippet \\eta\n\
	\\eta\n\
snippet \\Theta\n\
	\\Theta\n\
snippet \\theta\n\
	\\theta\n\
snippet \\vartheta\n\
	\\vartheta\n\
snippet \\kappa\n\
	\\kappa\n\
snippet \\Lambda\n\
	\\Lambda\n\
snippet \\lambda\n\
	\\lambda\n\
snippet \\mu\n\
	\\mu\n\
snippet \\nu\n\
	\\nu\n\
snippet \\Xi\n\
	\\Xi\n\
snippet \\xi\n\
	\\xi\n\
snippet \\omicron\n\
	\\omicron\n\
snippet \\Pi\n\
	\\Pi\n\
snippet \\pi\n\
	\\pi\n\
snippet \\rho\n\
	\\rho\n\
snippet \\Sigma\n\
	\\Sigma\n\
snippet \\sigma\n\
	\\sigma\n\
snippet \\tau\n\
	\\tau\n\
snippet \\Upsilon\n\
	\\Upsilon\n\
snippet \\Phi\n\
	\\Phi\n\
snippet \\phi\n\
	\\phi\n\
snippet \\chi\n\
	\\chi\n\
snippet \\Psi\n\
	\\Psi\n\
snippet \\psi\n\
	\\psi\n\
snippet \\Omega\n\
	\\Omega\n\
snippet \\omega\n\
	\\omega\n\
snippet \\sum\n\
	\\sum{${1:n=0}}{${2:\\infty}}\n\
snippet \\int\n\
	\\int{${1}}{${2}}\n\
snippet \\oint\n\
	\\oint_{${1}}\n\
snippet \\prod\n\
	\\prod{${1:n=1}}{${2:\\infty}}\n\
snippet \\coprod\n\
	\\coprod\n\
snippet \\infty\n\
	\\infty\n\
snippet \\aleph\n\
	\\aleph\n\
snippet \\jmath\n\
	\\jmath\n\
snippet \\imath\n\
	\\imath\n\
snippet \\Re\n\
	\\Re\n\
snippet \\prime\n\
	\\prime\n\
snippet \\surd\n\
	\\surd\n\
snippet \\S\n\
	\\S\n\
snippet \\hbar\n\
	\\hbar\n\
snippet \\ell\n\
	\\ell\n\
snippet \\partial\n\
	\\partial\n\
snippet \\angle\n\
	\\angle\n\
snippet \\backslash\n\
	\\backslash\n\
snippet \\nless\n\
	\\nless\n\
snippet \\ngtr\n\
	\\ngtr\n\
snippet \\leq\n\
	\\leq\n\
snippet \\geq\n\
	\\geq\n\
snippet \\leqslant\n\
	\\leqslant\n\
snippet \\geqslant\n\
	\\geqslant\n\
snippet \\nleq\n\
	\\nleq\n\
snippet \\ngeq\n\
	\\ngeq\n\
snippet \\ngeqslant\n\
	\\ngeqslant\n\
snippet \\lneq\n\
	\\lneq\n\
snippet \\gneq\n\
	\\gneq\n\
snippet \\lneqq\n\
	\\lneqq\n\
snippet \\gneqq\n\
	\\gneqq\n\
snippet \\prec\n\
	\\prec\n\
snippet \\succ\n\
	\\succ\n\
snippet \\nprec\n\
	\\nprec\n\
snippet \\nsucc\n\
	\\nsucc\n\
snippet \\preceq\n\
	\\preceq\n\
snippet \\succeq\n\
	\\succeq\n\
snippet \\npreceq\n\
	\\npreceq\n\
snippet \\nsucceq\n\
	\\nsucceq\n\
snippet \\ll\n\
	\\ll\n\
snippet \\gg\n\
	\\gg\n\
snippet \\lll\n\
	\\lll\n\
snippet \\ggg\n\
	\\ggg\n\
snippet \\emptyset\n\
	\\emptyset\n\
snippet \\subset\n\
	\\subset\n\
snippet \\nsubseteq\n\
	\\nsubseteq\n\
snippet \\nsupseteq\n\
	\\nsupseteq\n\
snippet \\sqsubset\n\
	\\sqsubset\n\
snippet \\sqsupset\n\
	\\sqsupset\n\
snippet \\sqsubseteq\n\
	\\sqsubseteq\n\
snippet \\sqsupseteq\n\
	\\sqsupseteq\n\
snippet \\cap\n\
	\\cap\n\
snippet \\cup\n\
	\\cup\n\
snippet \\uplus\n\
	\\uplus\n\
snippet \\vee\n\
	\\vee\n\
snippet \\wedge\n\
	\\wedge\n\
snippet \\equiv\n\
	\\equiv\n\
snippet \\doteq\n\
	\\doteq\n\
snippet \\approx\n\
	\\approx\n\
snippet \\cong\n\
	\\cong\n\
snippet \\simeq\n\
	\\simeq\n\
snippet \\bumpeq\n\
	\\bumpeq\n\
snippet \\sim\n\
	\\sim\n\
snippet \\nsim\n\
	\\nsim\n\
snippet \\lnsim\n\
	\\lnsim\n\
snippet \\propto\n\
	\\propto\n\
snippet \\bowtie\n\
	\\bowtie\n\
snippet \\neq\n\
	\\neq\n\
snippet \\perp\n\
	\\perp\n\
snippet \\parallel\n\
	\\parallel\n\
snippet \\nparallel\n\
	\\nparallel\n\
snippet \\dashv\n\
	\\dashv\n\
snippet \\vdash\n\
	\\vdash\n\
snippet \\rhd\n\
	\\rhd\n\
snippet \\lhd\n\
	\\lhd\n\
snippet \\unlhd\n\
	\\unlhd\n\
snippet \\unrhd\n\
	\\unrhd\n\
snippet \\asymp\n\
	\\asymp\n\
snippet \\in\n\
	\\in\n\
snippet \\forall\n\
	\\forall\n\
snippet \\exists\n\
	\\exists\n\
snippet \\smile\n\
	\\smile\n\
snippet \\frown\n\
	\\frown\n\
snippet \\amalg\n\
	\\amalg\n\
snippet \\oslash\n\
	\\oslash\n\
snippet \\mid\n\
	\\mid\n\
snippet \\nmid\n\
	\\nmid\n\
snippet \\uparrow\n\
	\\uparrow\n\
snippet \\Uparrow\n\
	\\Uparrow\n\
snippet \\downarrow\n\
	\\downarrow\n\
snippet \\Downarrow\n\
	\\Downarrow\n\
snippet \\updownarrow\n\
	\\updownarrow\n\
snippet \\Updownarrow\n\
	\\Updownarrow\n\
snippet \\nearrow\n\
	\\nearrow\n\
snippet \\searrow\n\
	\\searrow\n\
snippet \\swarrow\n\
	\\swarrow\n\
snippet \\nwarrow\n\
	\\nwarrow\n\
snippet \\leftarrow\n\
	\\leftarrow\n\
snippet \\Leftarrow\n\
	\\Leftarrow\n\
snippet \\rightarrow\n\
	\\rightarrow\n\
snippet \\Rightarrow\n\
	\\Rightarrow\n\
snippet \\leftrightarrow\n\
	\\leftrightarrow\n\
snippet \\Leftrightarrow\n\
	\\Leftrightarrow\n\
snippet \\mapsto\n\
	\\mapsto\n\
snippet \\hookleftarrow\n\
	\\hookleftarrow\n\
snippet \\hookrightarrow\n\
	\\hookrightarrow\n\
snippet \\leftharpoonup\n\
	\\leftharpoonup\n\
snippet \\leftharpoondown\n\
	\\leftharpoondown\n\
snippet \\rightleftharpoons\n\
	\\rightleftharpoons\n\
snippet \\rightharpoonup\n\
	\\rightharpoonup\n\
snippet \\rightharpoondown\n\
	\\rightharpoondown\n\
snippet \\leadsto\n\
	\\leadsto\n\
snippet \\longrightarrow\n\
	\\longrightarrow\n\
snippet \\longleftarrow\n\
	\\longleftarrow\n\
snippet \\Longleftarrow\n\
	\\Longleftarrow\n\
snippet \\Longrightarrow\n\
	\\Longrightarrow\n\
snippet \\longleftrightarrow\n\
	\\longleftrightarrow\n\
snippet \\Longleftrightarrow\n\
	\\Longleftrightarrow\n\
snippet \\frac\n\
	\\frac{${1}}{${2}}\n\
snippet \\sqrt\n\
	\\sqrt[${1}]{${2}}\n\
snippet \\pi\n\
	\\pi\n\
snippet \\geq\n\
	\\geq\n\
snippet \\leq\n\
	\\leq\n\
snippet \\left\n\
	\\left\n\
snippet \\sin\n\
	\\sin\n\
snippet \\cos\n\
	\\cos\n\
snippet \\tan\n\
	\\tan\n\
snippet \\cot\n\
	\\cot\n\
snippet \\sec\n\
	\\sec\n\
snippet \\csc\n\
	\\csc\n\
snippet \\log\n\
	\\log\n\
snippet \\exp\n\
	\\exp\n\
snippet \\ln\n\
	\\ln\n\
snippet \\usepackage \n\
	\\usepackage{${1}}\n\
snippet \\newcommand \n\
	\\newcommand{${1}}\n\
snippet \\begin{document}...\n\
	\\begin{document} ${1} \\end{document}\n\
snippet \\begin{titlepage}...\n\
	\\begin{titlepage} ${1} \\end{titlepage}\n\
snippet \\begin{figure}...\n\
	\\begin{figure} ${1} \\end{figure}\n\
snippet \\begin{enumerate}...\n\
	\\begin{enumerate} ${1} \\end{enumerate}\n\
snippet \\section\n\
	\\section{${1}}\n\
snippet \\subsection\n\
	\\subsection{${1}}\n\
";
exports.scope = "latex";

});
