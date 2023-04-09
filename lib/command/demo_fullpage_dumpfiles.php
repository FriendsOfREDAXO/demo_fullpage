<?php

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class rex_command_demo_fullpage_dumpfiles extends rex_console_command
{
    protected function configure(): void
    {
        $this->setDescription('Dumps the Fullpage-Demo-MediaFiles to backups/demo_fullpage.tar.gz');
        $this->addOption('yes', 'y', InputOption::VALUE_NONE, 'Overwrite existing file backups/demo_fullpage.tar.gz?');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = $this->getStyle($input, $output);

        $skipConfirmation = true === $input->getOption('yes');

        $io->title('Fullpage-Demo - Dump MediaFiles');

        if (!$input->isInteractive() && !$skipConfirmation) {
            return 1;
        }

        if (!$skipConfirmation && !$io->confirm('Current file backups/demo_fullpage.tar.gz will be overwritten. Would you like to proceed?')) {
            return 1;
        }

        $io->writeln('Run dump Fullpage-Demo-MediaFiles ...');

        $errors = rex_demo_fullpage::dump_files();

        if (count($errors) > 0) {
            $io->error($this->decodeMessage("Failed to dump Fullpage-Demo-MediaFiles:\n- " . implode("\n- ", $errors)));
            return 1;
        }
        $io->success('Successfully dumped Fullpage-Demo-MediaFiles!');
        return 0;
    }
}
