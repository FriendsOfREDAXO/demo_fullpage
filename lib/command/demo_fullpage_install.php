<?php

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class rex_command_demo_fullpage_install extends rex_console_command
{
    protected function configure(): void
    {
        $this->setDescription('Installs the REDAXO Fullpage-Demo');
        $this->addOption('yes', 'y', InputOption::VALUE_NONE, 'runs the installation without confirmation');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = $this->getStyle($input, $output);

        $skipConfirmation = true === $input->getOption('yes');

        $io->title('Fullpage-Demo Installation');

        if (!$input->isInteractive() && !$skipConfirmation) {
            return 1;
        }

        if (!$skipConfirmation && !$io->confirm('Current data will be deleted. Would you like to proceed?')) {
            return 1;
        }

        $io->writeln('Run installation ...');

        $errors = rex_demo_fullpage::install();

        if (count($errors) > 0) {
            $io->error($this->decodeMessage("Failed to install demo:\n- " . implode("\n- ", $errors)));
            return 1;
        }
        $io->success('Successfully installed demo!');
        return 0;
    }
}
