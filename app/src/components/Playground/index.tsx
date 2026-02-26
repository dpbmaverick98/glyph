import { usePlayground, type PlaygroundConfig } from './usePlayground';
import { SplitPane } from './SplitPane';
import { PlaygroundConfig as ConfigPanel } from './PlaygroundConfig';
import { PlaygroundCode } from './PlaygroundCode';
import { PlaygroundResponse } from './PlaygroundResponse';

interface PlaygroundProps {
  config: PlaygroundConfig;
}

export function Playground({ config }: PlaygroundProps) {
  const {
    state,
    currentEndpoint,
    generateCode,
    execute,
    setParam,
    setHeader,
    setBody,
    selectLanguage,
  } = usePlayground(config);

  const code = generateCode(state.selectedLanguage);

  return (
    <div className="my-6">
      <SplitPane
        left={
          <ConfigPanel
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
            code={code}
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
