package cn.wonhigh.o2o.springframework.core.io.support;

/**
 * 配置
 * 
 * @author lin.zb
 * @date 2016年2月18日 下午4:50:35
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public class CompanyConfigManage {
	/**
	 * 环境名
	 */
	private String modeName;

	/**
	 * 项目名
	 */
	private String projectName;

	/**
	 * 配置名
	 */
	private String configName;

	/**
	 * 配置值
	 */
	private String configValue;

	public String getModeName() {
		return modeName;
	}

	public void setModeName(String modeName) {
		this.modeName = modeName;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getConfigName() {
		return configName;
	}

	public void setConfigName(String configName) {
		this.configName = configName;
	}

	public String getConfigValue() {
		return configValue;
	}

	public void setConfigValue(String configValue) {
		this.configValue = configValue;
	}

	@Override
	public String toString() {
		return "CompanyConfigManage [modeName=" + modeName + ", projectName=" + projectName + ", configName="
				+ configName + ", configValue=" + configValue + "]";
	}
}
