import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";
import tinycolor from "tinycolor2";

type ChipProps = {
  text: string;
  icon?: ReactNode;
  color: string; // Cor principal
};

function generateStyles(color: string) {
    const base = tinycolor(color);
  
    const bgColor = base.setAlpha(0.15).toRgbString(); // Fundo transparente
    const borderColor = base.darken(10).toString(); // Borda sólida
    const textColor = base.darken(5).setAlpha(1).toString(); // Texto sólido e opaco
    const selectionBg = base.lighten(30).setAlpha(0.4).toRgbString(); // Seleção leve
    const selectionText = base.darken(50).toString(); // Texto da seleção
  
    return {
      chipStyle: {
        backgroundColor: bgColor,
        borderColor,
      } as CSSProperties,
      textStyle: {
        color: textColor,
        backgroundColor: 'transparent', // Certifica que o fundo é transparente, mas sem interferir no texto
      } as CSSProperties,
      selectionStyle: `
        ::selection {
          background-color: ${selectionBg};
          color: ${selectionText};
        }
      `,
    };
  }
  

export function Chip({ text, icon, color }: ChipProps) {
  const { chipStyle, textStyle, selectionStyle } = generateStyles(color);

  return (
    <>
      <style>{selectionStyle}</style> {/* Estilo para seleção do texto */}
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-0 rounded-full border shadow-sm cursor-pointer"
        )}
        style={chipStyle}
      >
        {icon && <span className="w-6 h-6">{icon}</span>}
        <span className="font-medium" style={textStyle}>
          {text}
        </span>
      </div>
    </>
  );
}
