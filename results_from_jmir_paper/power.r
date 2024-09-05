
effect_size <- function(data_0, data_1){
	# based on 
	# https://www.statskingdom.com/effect-size-calculator.html

	s <- sqrt((sd(data_0)^2 + sd(data_1)^2)/2)
	d <- abs(mean(data_0) - mean(data_1))/s
	return (d)
}

sample_size_required <- function(data_0, data_1, effect_size){
	# based on 
	# https://www.statskingdom.com/sample_size_t_z.html

	library(MESS)
	delta <- effect_size * sqrt((sd(data_0)^2+sd(data_1)^2)/2)
	sd <- sd(data_0)
	sd_ratio <- sd(data_1)/sd(data_0)

	results <- power_t_test(delta=delta, 
			       sd=sd,
			       sig.level =0.05, 
			       power=0.8,
			       ratio=1,
			       sd.ratio=sd_ratio, 
			       type="two.sample",
			       alternative="two.sided",
			       df.method="welch")
	return(results)
}
raw_data <- read.csv('results.csv')
print ("Comparing 1 and 2")
es <- effect_size(raw_data$X2.time, raw_data$X1.time)
print(es)
sample_size_required(raw_data$X2.time, raw_data$X1.time, es)
print ("Comparing 2 and 3")
es <- effect_size(raw_data$X2.time, raw_data$X3.time)
print(es)
sample_size_required(raw_data$X2.time, raw_data$X3.time, es)
print ("Comparing 3 and 4")
es <- effect_size(raw_data$X3.time, raw_data$X4.time)
print(es)
sample_size_required(raw_data$X3.time, raw_data$X4.time, es)
print ("Comparing 4 and 5")
es <- effect_size(raw_data$X4.time, raw_data$X5.time)
print(es)
sample_size_required(raw_data$X4.time, raw_data$X5.time, es)
print ("Comparing 5 and 6")
es <- effect_size(raw_data$X6.time, raw_data$X5.time)
print(es)
sample_size_required(raw_data$X6.time, raw_data$X5.time, es)
print ("Comparing 6 and 7")
es <- effect_size(raw_data$X6.time, raw_data$X7.time)
print(es)
sample_size_required(raw_data$X6.time, raw_data$X7.time, es)
