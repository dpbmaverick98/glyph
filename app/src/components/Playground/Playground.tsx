import { usePlayground, type PlaygroundConfig } from './usePlayground';
import { SplitPane } from './SplitPane';
import { PlaygroundConfigPanel } from './PlaygroundConfig';
import { PlaygroundCode } from './PlaygroundCode';
import { PlaygroundResponse } from './PlaygroundResponse';

interface PlaygroundProps {
  config: PlaygroundConfig;
}

export function Playground({ config }: PlaygroundProps) {
  const {
    state,
    currentEndpoint,
    generatedCode,
    execute,
    setParam,
    setHeader,
    setBody,
    selectLanguage,
  } = usePlayground(config);

  return (
    <div className="my-6">
      <SplitPane
        left={
          <PlaygroundConfigPanel
            endpoint={currentEndpoint}
            params={state.params}
            headers={state.headers}
            body={state.body}
            onParamChange={setParam}
            onHeaderChange={setHeader}
            onBodyChange={setBody}
            onExecute={execute}
            isLoading={state.isLoading}
          />
        }
        rightTop={
          <PlaygroundCode
            code={generatedCode}
            language={state.selectedLanguage}
            onLanguageChange={selectLanguage}
          />
        }
        rightBottom={
          <PlaygroundResponse
            response={state.response}
            error={state.error}
          />
        }
      />
    </div>
  );
}

export type { PlaygroundConfig, Endpoint, Param, HttpMethod, Language } from './usePlayground';
