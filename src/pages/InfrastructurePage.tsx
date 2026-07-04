import React from 'react';
import { Database, Cpu, ExternalLink, HardDrive } from 'lucide-react';

interface CloudProvider {
  name: string;
  flagshipService: string;
  overview: string;
  keyOfferings: string[];
  docsUrl: string;
  pricingUrl: string;
}

const CLOUDS: CloudProvider[] = [
  {
    name: 'AWS (Amazon Web Services)',
    flagshipService: 'Amazon Bedrock & SageMaker',
    overview: 'Complete serverless AI platform enabling secure access to leading base models (Claude, Llama, Titan) paired with custom chips (Trainium, Inferentia) for cost-effective training and inference.',
    keyOfferings: ['Amazon Bedrock Serverless APIs', 'SageMaker Model Training Pipelines', 'AWS Trainium / Inferentia ASICs'],
    docsUrl: 'https://docs.aws.amazon.com/bedrock/',
    pricingUrl: 'https://aws.amazon.com/bedrock/pricing/'
  },
  {
    name: 'Google Cloud Platform (GCP)',
    flagshipService: 'Vertex AI & TPU Accelerators',
    overview: 'Developer-first AI portal natively integrating Gemini models, offering Vertex Search and Conversation layers, custom agent building blocks, and access to massive GCP TPU v5p compute grids.',
    keyOfferings: ['Vertex AI Studio & Model Garden', 'Google Cloud TPU Accelerators', 'Gemini Agent Orchestration API'],
    docsUrl: 'https://cloud.google.com/vertex-ai/docs',
    pricingUrl: 'https://cloud.google.com/vertex-ai/pricing'
  },
  {
    name: 'Microsoft Azure',
    flagshipService: 'Azure OpenAI & Azure AI Studio',
    overview: 'Enterprise-grade cloud hosting OpenAI\'s models (GPT-4, DALL-E) with strict data sovereignty, vector search capabilities, safety filter layers, and Azure AI Studio orchestration.',
    keyOfferings: ['Azure OpenAI Private Deployment', 'Azure AI Search Vector Indexing', 'Azure AI Studio Agent Flow'],
    docsUrl: 'https://learn.microsoft.com/en-us/azure/ai-services/',
    pricingUrl: 'https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/'
  },
  {
    name: 'NVIDIA AI Enterprise',
    flagshipService: 'NVIDIA DGX Cloud & NIM (Microservices)',
    overview: 'The compute standard for artificial intelligence, offering supercomputing scale, CUDA acceleration libraries, and NIM (NVIDIA Inference Microservices) for deploying models locally or in the cloud.',
    keyOfferings: ['Nvidia DGX Cloud Supercomputing', 'NIM (NVIDIA Inference Microservices)', 'NVIDIA TensorRT GPU optimization'],
    docsUrl: 'https://developer.nvidia.com',
    pricingUrl: 'https://www.nvidia.com/en-us/data-center/dgx-cloud/'
  }
];

export const InfrastructurePage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase mb-3">
          <HardDrive className="w-3.5 h-3.5" />
          Hardware & Cloud Stacks
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          AI & Compute <span className="gold-gradient-text">Infrastructure</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          The silicon accelerators, GPU hyper-clusters, serverless model registry APIs, and private cloud deployment platforms driving GenAI execution.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CLOUDS.map((c) => (
            <div
              key={c.name}
              className="p-6 rounded-2xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top ambient line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-gold/40 to-transparent" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block">
                    {c.name}
                  </span>
                  <span className="text-xs text-slate-400 font-medium italic">{c.flagshipService}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-200">
                  {c.name.split(' (')[0]}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {c.overview}
                </p>

                {/* Key Services list */}
                <div className="space-y-2 pt-3">
                  <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider block">Key Stacks & HW</span>
                  <div className="flex flex-col gap-1.5">
                    {c.keyOfferings.map((off) => (
                      <div key={off} className="flex items-center gap-2 text-xs text-slate-300">
                        <Cpu className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                        <span>{off}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-gold/5 flex items-center justify-between text-xs font-semibold">
                <a
                  href={c.pricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-300"
                >
                  Model Pricing Guide
                </a>
                <a
                  href={c.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-brand-gold-bright hover:text-brand-gold transition-colors"
                >
                  <Database className="w-3.5 h-3.5" />
                  Technical Docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfrastructurePage;
