import React from "react";
import logoMetaImg from "@assets/Untitled design_1763734023468.png";
import logoN8nImg from "@assets/n8n-color_1764010615072.png";
import logoAwsImg from "@assets/amazon-web-services-aws-logo-png_seeklogo-319188_1764010753701.png";
import logoPineconeImg from "@assets/2_1764020469942.png";
import logoOpenAIImg from "@assets/1_1764020469942.png";
import logoClaudeImg from "@assets/Claude_AI_symbol.svg_1764011096378.png";

export const LogoAWS = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img 
    src={logoAwsImg} 
    alt="AWS" 
    {...props}
    className={`${props.className} mix-blend-multiply object-contain`}
  />
);

export const LogoN8n = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img 
    src={logoN8nImg} 
    alt="n8n" 
    {...props}
    className={`${props.className} object-contain`}
  />
);

export const LogoTwilio = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6z" fill="#F22F46"/>
    <circle cx="8.4" cy="8.4" r="2.4" fill="#F22F46"/>
    <circle cx="15.6" cy="8.4" r="2.4" fill="#F22F46"/>
    <circle cx="8.4" cy="15.6" r="2.4" fill="#F22F46"/>
    <circle cx="15.6" cy="15.6" r="2.4" fill="#F22F46"/>
  </svg>
);

export const LogoWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
  </svg>
);

export const LogoMeta = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img 
    src={logoMetaImg} 
    alt="Meta" 
    {...props}
    className={`${props.className} mix-blend-multiply object-contain`}
  />
);

export const LogoPinecone = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img 
    src={logoPineconeImg} 
    alt="Pinecone" 
    {...props}
    className={`${props.className} mix-blend-multiply object-contain`}
  />
);

export const LogoOpenAI = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img 
    src={logoOpenAIImg} 
    alt="OpenAI" 
    {...props}
    className={`${props.className} mix-blend-multiply object-contain bg-white rounded-full`}
  />
);

export const LogoClaude = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img 
    src={logoClaudeImg} 
    alt="Claude" 
    {...props}
    className={`${props.className} object-contain`}
  />
);

export const LogoGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
