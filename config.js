const stage = process.env.stage;

const stageConfigs = {
  dev: {
  },
  prod: {
  }
};

const config = stageConfigs[stage] || stageConfigs.dev;

export default {
  stage,
  ...config
};
